// Codemod: annotate untyped params and empty-literal variables as `any`.
import fs from 'node:fs'
import ts from 'typescript'
for (const file of process.argv.slice(2)) {
  const text = fs.readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const edits = []
  const visit = (n) => {
    if (ts.isParameter(n) && !n.type && n.name.getText() !== 'this') {
      const fn = n.parent
      // Arrow fn with a single bare param needs parens: x => ...  ->  (x: any) => ...
      if (ts.isArrowFunction(fn) && fn.parameters.length === 1 && text[fn.parameters.pos - 1] !== '(' && text.slice(fn.getStart(sf), n.getStart(sf)).trim() === '') {
        edits.push([n.getStart(sf), '('], [n.name.end, ': any)'])
      } else if (n.dotDotDotToken) edits.push([n.name.end, ': any[]'])
      // Optional: the logic often calls helpers with fewer arguments than declared.
      else if (n.questionToken) edits.push([n.questionToken.end, ': any'])
      else edits.push([n.name.end, n.initializer || !ts.isIdentifier(n.name) ? ': any' : '?: any'])
    }
    const inLoopHead = !!n.parent && ts.isVariableDeclarationList(n.parent) && (ts.isForOfStatement(n.parent.parent) || ts.isForInStatement(n.parent.parent))
    if (ts.isVariableDeclaration(n) && !inLoopHead && !n.type && n.initializer && ts.isIdentifier(n.name) && ts.isObjectLiteralExpression(n.initializer) && n.initializer.properties.length) {
      edits.push([n.name.end, ': Record<string, any>'])
    }
    if (ts.isVariableDeclaration(n) && !inLoopHead && !n.type && n.initializer && ts.isIdentifier(n.name)) {
      const i = n.initializer
      if ((ts.isObjectLiteralExpression(i) && i.properties.length === 0) || (ts.isArrayLiteralExpression(i) && i.elements.length === 0) || i.kind === ts.SyntaxKind.NullKeyword)
        edits.push([n.name.end, ': any'])
    }
    if (ts.isVariableDeclaration(n) && !inLoopHead && !n.type && !n.initializer && ts.isIdentifier(n.name)) edits.push([n.name.end, ': any'])
    // ({ a: 1, b: 2 })[key] lookups
    if (ts.isElementAccessExpression(n)) {
      let o = n.expression
      while (ts.isParenthesizedExpression(o)) o = o.expression
      if (ts.isObjectLiteralExpression(o) || ts.isArrayLiteralExpression(o)) edits.push([o.getStart(sf), '('], [o.end, ' as any)'])
    }
    // Untyped collections hold whatever the logic puts in them.
    if (ts.isNewExpression(n) && !n.typeArguments && ts.isIdentifier(n.expression) && ['Map', 'Set'].includes(n.expression.text))
      edits.push([n.expression.end, n.expression.text === 'Map' ? '<any, any>' : '<any>'])
    if (ts.isVariableDeclaration(n) && !inLoopHead && !n.type && n.initializer && ts.isIdentifier(n.name)) {
      const i = n.initializer
      const fallbackObj = ts.isBinaryExpression(i) && i.operatorToken.kind === ts.SyntaxKind.BarBarToken && ts.isObjectLiteralExpression(i.right)
      const strConst = ts.isStringLiteral(i) && n.parent.flags & ts.NodeFlags.Const
      const nestedArr = ts.isArrayLiteralExpression(i) && i.elements.some((e) => ts.isArrayLiteralExpression(e))
      if (fallbackObj || nestedArr) edits.push([n.name.end, ': any'])
      if (strConst) edits.push([n.name.end, ': string'])
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)
  edits.sort((a, b) => b[0] - a[0])
  let out = text
  for (const [pos, s] of edits) out = out.slice(0, pos) + s + out.slice(pos)
  // Fields the logic assigns ad hoc, and loosely typed state.
  if (file.endsWith('Codex.tsx')) {
    const fields = [...new Set([...out.matchAll(/(?:this|me)\.([a-zA-Z_]\w*)\s*=(?!=)/g)].map((m) => m[1]))].filter((f) => !/^(state|rootRef)$/.test(f) && !new RegExp(`^  ${f}\\b`, 'm').test(out))
    out = out.replace('  state = {', '  // Instance fields the logic assigns ad hoc (drag tracking, history, caches).\n' + fields.sort().map((f) => `  declare ${f}: any\n`).join('') + '  state: any = {')
  }
  fs.writeFileSync(file, out)
  console.log(file, edits.length)
}
