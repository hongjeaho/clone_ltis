import { Link } from 'react-router-dom'

import styles from './MenuLogin.module.css'

const MenuLogin: React.FC = () => {
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
