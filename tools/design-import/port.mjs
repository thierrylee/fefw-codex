// Port the design's logic script (class Component extends DCLogic) to src/codex/{Codex.tsx,constants.ts}.
import fs from 'node:fs'
import prettier from 'prettier'
const [, , logicPath, out] = process.argv
const src = fs.readFileSync(logicPath, 'utf8')
const ci = src.indexOf('class Component extends DCLogic{')
let consts = src.slice(0, ci).trim()
let cls = src.slice(ci)
// constants module: export every top-level const
consts = consts.replace(/^const /gm, 'export const ')
cls = cls
  .replace('class Component extends DCLogic{', 'export class Codex extends Component<CodexProps, any> {\n static defaultProps = DEFAULT_PROPS;')
  .replace('rootRef=React.createRef();', 'rootRef=createRef<HTMLDivElement>();')
  .replace('fetch(window.__resources.dataJson)', "fetch(import.meta.env.BASE_URL + 'database/codex.json')")
cls = cls.replace(/\}\s*$/, `
 render() {
  return <AppView v={{ ...this.props, ...this.renderVals() }} />
 }
}`)
const used = consts.match(/^export const (\w+)/gm).map((m) => m.slice(13))
const header = `import { Component, createRef } from 'react'
import { AppView } from '../view/AppView'
import { ${used.join(', ')} } from './constants'
import { DEFAULT_PROPS, type CodexProps } from './props'
`
const fmt = (c) => prettier.format(c, { parser: 'typescript', semi: false, singleQuote: true, printWidth: 120 })
fs.writeFileSync(out + '/constants.ts', await fmt(consts + '\n'))
fs.writeFileSync(out + '/Codex.tsx', await fmt(header + '\n' + cls + '\n'))
