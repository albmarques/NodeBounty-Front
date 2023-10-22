import { useState, useEffect, useContext } from 'react'

import { api } from '@lib/api'
import { authContext } from '@contexts/AuthContext.jsx'

import { Loading } from '@components/Loading'
import styles from './styles.module.css'

export function PrivateHome() {
  const [dadosConta, setDadosConta] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { logout } = useContext(authContext)

  useEffect(() => {
    async function loadAccountData() {
      try {
        setIsLoading(true)
        const { data } = await api.get('/conta')
        setDadosConta(data)
        setIsLoading(false)
      } catch (error) {
        alert('Um erro ocorreu')
        console.log(error)
      }
    }
    loadAccountData()
  }, [])

  function handleLogout() {
    logout()
  }

  console.log(dadosConta)

  return isLoading ? (
    <Loading />
  ) : (
    <main className={styles.containerHome}>
      <span>
        Plano: <strong>{dadosConta.plano.idPlano}</strong>
      </span>
      <h1>Bem vindo, {dadosConta.cliente.nome}</h1>
      <div>
        <strong>Saldo: {dadosConta.saldoConta}</strong>
      </div>
    </main>
  )
}
