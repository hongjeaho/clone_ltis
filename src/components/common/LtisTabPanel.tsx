import { type PropsWithChildren } from 'react'

interface LtisTabPanelProps extends PropsWithChildren {
  value: number
  index: number
}

const LtisTabPanel: React.FC<LtisTabPanelProps> = ({ value, index, children }) => {
  if (value !== index) return null

  return <div role="tabPanel">{children}</div>
}

export default LtisTabPanel
