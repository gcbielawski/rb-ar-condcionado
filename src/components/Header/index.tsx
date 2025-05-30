import { Link } from "react-router-dom"
import styles from "./styles.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/"><h1>RB Ar Condicionados</h1></Link>
      <nav>
        <ul>
          <li><Link to="/">Agendamentos</Link></li>
          <li><Link to="/quotes">Orçamentos</Link></li>
          <li><Link to="/history">Histórico</Link></li>
        </ul>
      </nav>
    </header>
  )
}