import { MenuItem } from '@szhsin/react-menu'
import MainMenuItem from './MainMenuItem'
import { Link } from 'react-router-dom'
import '@szhsin/react-menu/dist/index.css'
import menuData from '@/data/menu.json'
import { type Menu, type SubMenu } from '@/type/common/Menu'
import styles from './MainMenu.module.css'

const MainMenu: React.FC = () => {
  return (
    <div className={styles.menu}>
      {menuData.map((menu: Menu, index) => (
        <MainMenuItem key={index} name={menu.name}>
          {menu.sub.map((subMenu: SubMenu, index) => (
            <MenuItem key={index}>
              <Link to={subMenu.path}>{subMenu.name}</Link>
            </MenuItem>
          ))}
        </MainMenuItem>
      ))}
    </div>
  )
}

export default MainMenu
