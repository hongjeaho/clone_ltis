import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import { isLoginSelector } from '@/store/user'

import styles from './MenuLogin.module.css'

const MenuLogin: React.FC = () => {
  const isLogin = useRecoilValue<boolean>(isLoginSelector)

  if (isLogin) return null

  return (
    <div className={styles.login}>
      <ul>
        <li>
          <Link to={'/login'}>로그인</Link>
        </li>
      </ul>
    </div>
  )
}

export default MenuLogin
