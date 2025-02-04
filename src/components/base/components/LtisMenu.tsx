import { MenuItem } from "@szhsin/react-menu"
import LtisMenuItem from "./LtisMenuItem"
import { Link } from "react-router-dom"
import styles from "./Ltismenu.module.css"
import '@szhsin/react-menu/dist/index.css';

const LtisMenu: React.FC = () => {
  return (
    <div className={styles.menu}>
        <LtisMenuItem name="토지수용제도안내">
            <MenuItem><Link to="/">Cut111</Link></MenuItem>
            <MenuItem><Link to="/">Copy111</Link></MenuItem>
            <MenuItem><Link to="/">Paste111</Link></MenuItem>
        </LtisMenuItem>
        <LtisMenuItem name="사업시행자">
            <MenuItem><Link to="/">Cut111</Link></MenuItem>
            <MenuItem><Link to="/">Copy111</Link></MenuItem>
            <MenuItem><Link to="/">Paste111</Link></MenuItem>
        </LtisMenuItem>
        <LtisMenuItem name="시.구(열람공고)">
            <MenuItem><Link to="/">Cut111</Link></MenuItem>
            <MenuItem><Link to="/">Copy111</Link></MenuItem>
            <MenuItem><Link to="/">Paste111</Link></MenuItem>
        </LtisMenuItem>
        <LtisMenuItem name="감정평가사">
            <MenuItem><Link to="/">Cut111</Link></MenuItem>
            <MenuItem><Link to="/">Copy111</Link></MenuItem>
            <MenuItem><Link to="/">Paste111</Link></MenuItem>
        </LtisMenuItem>
        <LtisMenuItem name="재결관">
            <MenuItem><Link to="/">Cut111</Link></MenuItem>
            <MenuItem><Link to="/">Copy111</Link></MenuItem>
            <MenuItem><Link to="/">Paste111</Link></MenuItem>
        </LtisMenuItem>
        <LtisMenuItem name="심의위원">
            <MenuItem><Link to="/">Cut111</Link></MenuItem>
            <MenuItem><Link to="/">Copy111</Link></MenuItem>
            <MenuItem><Link to="/">Paste111</Link></MenuItem>
        </LtisMenuItem>
        <LtisMenuItem name="게시판">
            <MenuItem><Link to="/">Cut111</Link></MenuItem>
            <MenuItem><Link to="/">Copy111</Link></MenuItem>
            <MenuItem><Link to="/">Paste111</Link></MenuItem>
        </LtisMenuItem>
    </div>
  )
}

export default LtisMenu