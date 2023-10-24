import { useContext } from 'react'
import {
  UserCircle,
  Money,
  Question,
  CreditCard,
  ChartLineUp,
  SignOut,
} from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import { authContext } from '@contexts/AuthContext.jsx'

import styles from './styles.module.css'

export function Sidebar() {
  const { logout } = useContext(authContext)

  function handleLogout() {
    logout()
  }

  return (
    <aside className={styles.sidebar}>
      <nav>
        <NavLink to="/">
          <UserCircle size={32} />
          Conta
        </NavLink>
        <NavLink to="/transacoes">
          <Money size={32} />
          Transações
        </NavLink>
        <NavLink to="/ajuda">
          <Question size={32} />
          Ajuda
        </NavLink>
        <NavLink to="/cartoes">
          <CreditCard size={32} />
          Cartões
        </NavLink>
        <NavLink to="/investir">
          <ChartLineUp size={32} />
          Investir
        </NavLink>
        <button onClick={handleLogout}>
          <SignOut size={32} />
          Sair
        </button>
      </nav>
    </aside>
  )
}
