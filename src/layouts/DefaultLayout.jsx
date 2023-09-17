import { Outlet } from 'react-router-dom'

import Logo from '@assets/Logo.svg'

export function DefaultLayout() {
  return (
    <>
      <header>Header <img src={Logo} alt="Logo da Node Bounty"/></header>
      <Outlet />
      <footer>Footer</footer>
    </>
  )
}
