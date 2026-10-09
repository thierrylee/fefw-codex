// Display options exposed by the design (its "Display" / "Behavior" props).
export interface CodexProps {
  device: 'Responsive' | 'Phone'
  navStyle: 'Sidebar' | 'Top tabs'
  theme: 'Emerald' | 'Nocturne' | 'Ink'
  lockStyle: 'Blur teaser' | 'Hide'
  clearStyle: 'Checkbox' | 'Tap to cycle' | 'Cleared chips'
  calcView?: string
}

export const DEFAULT_PROPS: CodexProps = {
  device: 'Responsive',
  navStyle: 'Sidebar',
  theme: 'Emerald',
  lockStyle: 'Blur teaser',
  clearStyle: 'Checkbox',
}
