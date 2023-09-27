import { Route, Routes } from 'react-router-dom'

import { DefaultLayout } from '@layouts/DefaultLayout.jsx'
import { AuthLayout } from '@layouts/AuthLayout.jsx'
import { HomePrivada } from '@pages/private/Home'
import { HomePublica } from '@pages/public/Home'
import { Cadastro } from '@pages/public/Cadastro'
import { Login } from '@pages/public/Login'

const usuarioEstaAutenticado = false

export function Router() {
  return (
    <Routes>
      {usuarioEstaAutenticado ? (
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<HomePrivada />} />
          {/*...Insira outras rotas privadas aqui */}
        </Route>  
      ) : (
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<HomePublica />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          {/*...Insira outras rotas públicas aqui */}
        </Route>
      )}
    </Routes>
  )
}
