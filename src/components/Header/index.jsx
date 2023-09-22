import { Link } from 'react-router-dom'
import Logo from '@assets/Logo.svg'
import styles from './styles.module.css'

export function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <img src={Logo} alt="Logo do Node Bounty" />

        <nav className={styles.nav}>
          <Link to="/">Node Invest +</Link>
          <Link to="/">Sobre</Link>
          <Link to="/">Abrir conta</Link>
          <Link to="/">Acesso</Link>
        </nav>        
      </div>
    </header>
  )
}