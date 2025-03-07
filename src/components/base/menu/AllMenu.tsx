import { useState } from 'react'
import { Link } from 'react-router-dom'

import { menuState } from '@/components/base/menu/menuData'
import { type Menu, type SubMenu } from '@/type/common/Menu'

import styles from './AllMenu.module.css'

const AllMenu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // // 모달 열기/닫기 함수
  const onOpenModal = () => {
    setIsModalOpen(isOpen => !isOpen)
  }

  return (
    <div className={`${styles.wrap} ${isModalOpen ? styles.open : ''}`}>
      <button onClick={onOpenModal} className={styles.hmb}>
        <i></i> <span>전체 메뉴</span>
      </button>
      <MenuPopup />
    </div>
  )
}

const MenuPopup: React.FC = () => {
  return (
    <div className={styles.hm_all_menu_wrap}>
      <ul className={styles.hm_all_menu}>
        {menuState.map((menu: Menu, index) => (
          <li key={index}>
            <strong>
              <Link to={menu.path}>{menu.name}</Link>
            </strong>
            <ul className={styles.hm_all_subMenu}>
              {menu.sub.map((subMenu: SubMenu, index) => (
                <li key={index}>
                  <Link to={subMenu.path}>{subMenu.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AllMenu
