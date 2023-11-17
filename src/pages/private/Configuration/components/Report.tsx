import { useEffect, useState } from 'react'
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory'

import { api } from '@lib/api'
import styles from './Report.module.css'

export function Report() {
  const [dadosTransacao, setDadosTransacao] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [dadosPizza, setDadosPizza] = useState([
    { tipo: 'Entradas', total: 2200 },
    { tipo: 'Saídas', total: 1250 },
  ])

  useEffect(() => {
    async function buscarDadosTransacao() {
      try {
        setIsLoading(true)
        const { data } = await api.get('/transacoes')
        setDadosTransacao(data)
        setIsLoading(false)
      } catch (error) {
        alert('Um erro ocorreu')
        console.log(error)
      }
    }
    buscarDadosTransacao()
  }, [])

  return (
    <section>
      <div className={styles.grid}>
        <div>
          <strong>Entradas</strong>
          <VictoryChart domainPadding={40} theme={VictoryTheme.material}>
            <VictoryBar data={dadosPizza} x="tipo" y="total" />
          </VictoryChart>
        </div>
        <div>
          <strong>Saídas</strong>
          <VictoryChart domainPadding={40} theme={VictoryTheme.material}>
            <VictoryBar data={dadosPizza} x="tipo" y="total" />
          </VictoryChart>
        </div>
        <div>
          <strong>Comparativo</strong>
          <VictoryChart domainPadding={40} theme={VictoryTheme.material}>
            <VictoryBar data={dadosPizza} x="tipo" y="total" />
          </VictoryChart>
        </div>
      </div>
      <pre>{JSON.stringify(dadosTransacao)}</pre>
    </section>
  )
}
