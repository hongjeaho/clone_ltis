import { Link } from 'react-router-dom'
import styles from './LtisLogin.module.css'

const LtisLogin: React.FC = () => {
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

export default LtisLogin