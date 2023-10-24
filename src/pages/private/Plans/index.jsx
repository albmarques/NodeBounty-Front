import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '@lib/api.js'
import { authContext } from '@contexts/AuthContext.jsx'

import { Loading } from '@components/Loading'
import { Button } from '@components/Button'

export function Plans() {
  const [plans, setPlans] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState('Beauty')
  const navigate = useNavigate()
  const { logout } = useContext(authContext)

  useEffect(() => {
    async function retrievePlansData() {
      // Verificando se o usuário possui uma conta já registrada. Caso tenha, redirecionar direto para a tela da conta
      try {
        setIsLoading(true)
        const response = await api.get('/conta')

        // Usuário possui conta, redirecionar para home
        if (response.status === 200) {
          navigate('/')
        }
      } catch (error) {
        // Usuário não possui conta, pegar os dados dos planos
        try {
          const { data } = await api.get('/planos')
          setPlans(data)
          setIsLoading(false)
        } catch (error) {
          alert('Ocorreu um erro ao carregar os planos')
          console.log(error)
          logout()
        }
      }
    }
    retrievePlansData()
  }, [logout, navigate])

  async function handleSubmitPlan(e) {
    e.preventDefault()

    try {
      await api.post('/conta', {
        nomePlano: selectedPlan,
      })
      navigate('/')
    } catch (error) {
      alert('Ocorreu um erro, por favor tente novamente')
      console.log(error)
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    <main>
      <form onSubmit={handleSubmitPlan}>
        <select
          name="nomePlano"
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          {plans.map((plan) => (
            <option value={plan.idPlano} key={plan.idPlano}>
              {plan.idPlano}
            </option>
          ))}
        </select>
        <Button titulo="Confirmar plano" type="submit" />
      </form>
    </main>
  )
}
