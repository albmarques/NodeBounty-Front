import { useState, useEffect } from 'react'

import { api } from '@lib/api'

import { Loading } from '@components/Loading'
import styles from './styles.module.css'

export function PrivateHome() {
  const [dadosConta, setDadosConta] = useState({})
  const [isLoading, setIsLoading] = useState(true)

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

  return isLoading ? (
    <Loading />
  ) : (
    <main className={styles.containerHome}>
      <div className={styles.userInfo}>
        <div>
          <p>
            Plano: <strong>{dadosConta.plano.idPlano}</strong>
          </p>
          <p>Conta: {dadosConta.numeroConta}</p>
        </div>
        <h1>Bem vindo, {dadosConta.cliente.nome}</h1>
      </div>
      <div className={styles.balance}>
        <strong>
          Saldo:{' '}
          {dadosConta.saldoConta.toLocaleString('default', {
            style: 'currency',
            currency: 'BRL',
          })}
        </strong>
      </div>
    </main>
  )
}
