import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from '@layouts/DefaultLayout.jsx'
import { AuthLayout } from '@layouts/AuthLayout.jsx'
import { HomePrivate } from '@pages/private/HomePrivate.jsx'
import { HomePublic } from '@pages/public/HomePublic.jsx'

const userIsAuthenticated = false

export function Router() {
  return (
    <Routes>
      {userIsAuthenticated ? (
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<HomePrivate />} />  
        </Route>  
      ) : (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<HomePublic />} />
        </Route>
      )}
    </Routes>
  )
}
