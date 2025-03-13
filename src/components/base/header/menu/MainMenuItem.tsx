import { ControlledMenu, useHover } from '@szhsin/react-menu'
import { type PropsWithChildren, useRef, useState } from 'react'

import styles from './MainMenuItem.module.css'

interface Props {
  name: string
}

const MainMenuItem: React.FC<PropsWithChildren<Props>> = ({ name, children }) => {
  const ref = useRef(null)
  const [isOpen, setOpen] = useState(false)
  const { anchorProps, hoverProps } = useHover(isOpen, setOpen)

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div ref={ref} {...anchorProps} className={styles.menuItem}>
        {name}
      </div>

      <ControlledMenu
        {...hoverProps}
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        menuClassName={styles.controllerMenuItem}
        transitionTimeout={0}
        onClose={onClose}
      >
        {children}
      </ControlledMenu>
    </>
  )
}

export default MainMenuItem
