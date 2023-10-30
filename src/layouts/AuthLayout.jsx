import { Outlet } from 'react-router-dom'

import { Sidebar } from '../components/Sidebar'
import styles from './AuthLayout.styles.module.css'

export function AuthLayout() {
  return (
    <div className={styles.authContainer}>
      <Sidebar />
      <Outlet />
    </div>
  )
}
