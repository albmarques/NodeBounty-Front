import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'

export function AuthLayout() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        minHeight: '100vh',
      }}
    >
      <Sidebar />
      <Outlet />
    </div>
  )
}
