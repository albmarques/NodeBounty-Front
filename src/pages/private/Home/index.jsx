import { useState, useEffect, useContext } from 'react'

import { api } from '@lib/api'
import { authContext } from '@contexts/AuthContext.jsx'

import { Loading } from '@components/Loading'
import { Button } from '@components/Button'

export function PrivateHome() {
  const [dados, setDados] = useState(null)
  const [isLoading, setIsLoading] = useState([])
  
  const { token, logout } = useContext(authContext)

  function handleLogout() {
    logout()
  }

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        const { data } = await api.get('/conta', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setDados(data)
      } catch(error) {
        alert('Um erro ocorreu')
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div>
      <Button titulo="Sair" onClick={handleLogout} />
      {isLoading ? <Loading /> : (
        <div>
          <h1>Cliente: {dados.cliente.nome}</h1>
          <h2>Plano: {dados.plano.idPlano}</h2>          
        </div>
      )}
    </div>
  )
}
