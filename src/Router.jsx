import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { authContext } from '@contexts/AuthContext'

import { DefaultLayout } from '@layouts/DefaultLayout.jsx'
import { AuthLayout } from '@layouts/AuthLayout.jsx'
import { PrivateHome } from '@pages/private/Home'
import { PublicHome } from '@pages/public/Home'
import { SignUp } from '@pages/public/SignUp'
import { Login } from '@pages/public/Login'
import { CreditCardPage } from '@pages/public/CreditCardPage'

export function Router() {
  const { token } = useContext(authContext)

  return (
    <Routes>
      {token ? (
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<PrivateHome />} />
          {/*...Insira outras rotas privadas aqui */}
        </Route>  
      ) : (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<PublicHome />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cartao" element={<CreditCardPage />}/>
          {/*...Insira outras rotas públicas aqui */}
        </Route>
      )}
    </Routes>
  )
}
