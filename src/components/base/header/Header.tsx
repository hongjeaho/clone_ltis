import AllMenu from '@components/base/header/menu/AllMenu'
import MainMenu from '@components/base/header/menu/MainMenu'
import MenuLogin from '@components/base/header/menu/MenuLogin'

import styles from './Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <h1>
            <a href="/" title="심의지원 시스템">
              <span className="blind">심의지원 시스템</span>
            </a>
          </h1>
        </div>
        <nav className={styles.nav}>
          <MainMenu />
          <MenuLogin />
          <AllMenu />
        </nav>
      </div>
    </header>
  )
}

export default Header
