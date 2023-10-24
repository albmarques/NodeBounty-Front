import { useNavigate } from 'react-router-dom'

import Grafo from '@assets/grafo.png'
import LogoDecorator from '@assets/logo-decorator.png'
import ExchangeIcon from '@assets/currency-exchange.svg'
import MoneyIcon from '@assets/money.svg'
import MoneyBagIcon from '@assets/money-bag.svg'
import CardImage from '@assets/card.png'
import FATLogo from '@assets/fundacaoFAT.png'
import BancoBrasilLogo from '@assets/bancoBrasil.png'
import FATECLogo from '@assets/fatec.png'

import { Button } from '@components/Button'
import styles from './styles.module.css'

export function PublicHome() {
  const navigate = useNavigate()

  return (
    <main className={styles.container}>
      <div className={styles.intro}>
        <div>
          <h1>A vantagem do futuro começa aqui.</h1>
          <img src={LogoDecorator} alt="Logo Node Bounty" />
        </div>
        <img src={Grafo} alt="Grafo de vantagens Node Bounty" />
      </div>

      <div className={styles.benefits}>
        <h2>Conheça nossos serviços</h2>
        <div className={styles.benefitsList}>
          <div className={styles.benefitCard}>
            <div>
              <img src={ExchangeIcon} alt="Icone de conversão de moedas" />
              <p>A troca origina um ciclo infindável de possibilidades.</p>
            </div>
            <strong>Conta-corrente</strong>
          </div>
          <div className={styles.benefitCard}>
            <div>
              <img src={MoneyIcon} alt="Icone de moedas" />
              <p>Quanto mais você usa sua conta, mais você ganha.</p>
            </div>
            <strong>Programa de cashback</strong>
          </div>
          <div className={styles.benefitCard}>
            <div>
              <img
                src={MoneyBagIcon}
                alt="Icone de conversão de uma sacola de dinheiro"
              />
              <p>
                Na node bounty valorizamos a confiança que nos é depositada.
              </p>
            </div>
            <strong>Simulador de CDI</strong>
          </div>
        </div>
      </div>

      <div className={styles.card}>
        <div>
          <h2>Conta corrente, cartão e investimentos</h2>
          <p>Para acompanhar e apoiar sua ascensão onde estiver.</p>
          <Button
            titulo="Abra sua conta"
            tipo="secundario"
            onClick={() => navigate('/cadastro')}
          />
        </div>
        <div className={styles.cardImage}>
          <img src={CardImage} alt="Cartão fícticio Node Bounty" />
        </div>
      </div>

      <div className={styles.sponsor}>
        <h2>Apoio</h2>
        <div>
          <div>
            <img src={FATLogo} alt="Logo fundação FAT" />
          </div>
          <div>
            <img src={BancoBrasilLogo} alt="Logo Banco do Brasil" />
          </div>
          <div>
            <img src={FATECLogo} alt="Logo da FATEC Zona Leste" />
          </div>
        </div>
      </div>
    </main>
  )
}
