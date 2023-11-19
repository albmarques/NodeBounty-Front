import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@lib/api'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import { Loading } from '@components/Loading'
import { Button } from '@components/Button'
import styles from './styles.module.css'

export function PrivateHome() {
  const [dadosConta, setDadosConta] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const { showToast, ToastComponents } = useToast()
  const navigate = useNavigate()

  // Carregando dados da conta
  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get('/conta')
      setDadosConta(data)
      setIsLoading(false)
    } catch (error) {
      const isAppError = error instanceof AppError
      // Verificando se o erro ocorreu pois o usuário não possui conta
      // Por não ter escolhido ainda na tela de planos.
      if (
        isAppError &&
        error.message ===
          'Cliente não possui nenhuma conta associada no sistema'
      ) {
        navigate('/planos')
      } else {
        alert('Um erro ocorreu')
        console.log(error)
      }
    }
  }, [navigate])

  // Chamando função para carregar os dados quando a página abrir
  useEffect(() => {
    loadAccountData()
  }, [loadAccountData])

  async function handleResgatar() {
    try {
      await api.post('/transacoes/resgatar')
      loadAccountData()
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = isAppError
        ? 'Verifique os dados e tente novamente.'
        : 'Tente novamente mais tarde.'

      showToast(title, description, true)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <div style={{ flex: 1 }}>
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
          <br />
          <p>
            Valor Cashback disponível:{' '}
            {dadosConta.cashbackConta.toLocaleString('default', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <Button titulo="Resgatar cashback" onClick={handleResgatar} />
        </div>
      </main>

      {ToastComponents}
    </div>
  )
}
