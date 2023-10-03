import { Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <>
      <aside>Sidebar</aside>
      <Outlet />
    </>
  )
}
