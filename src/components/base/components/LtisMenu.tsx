import { MenuItem } from '@szhsin/react-menu'
import LtisMenuItem from './LtisMenuItem'
import { Link } from 'react-router-dom'
import styles from './Ltismenu.module.css'
import '@szhsin/react-menu/dist/index.css'
import menuData from '@/data/menu.json'
import { type Menu, type SubMenu } from '@/type/common/Menu'

const LtisMenu: React.FC = () => {
  return (
    <div className={styles.menu}>
      {menuData.map((menu: Menu) => (
        <LtisMenuItem key={menu.path} name={menu.name}>
          {menu.sub.map((subMenu: SubMenu) => (
            <MenuItem key={subMenu.path}>
              <Link to={subMenu.path}>{subMenu.name}</Link>
            </MenuItem>
          ))}
        </LtisMenuItem>
      ))}
    </div>
  )
}

export default LtisMenu
