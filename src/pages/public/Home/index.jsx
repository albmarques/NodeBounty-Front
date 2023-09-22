import Grafo from '@assets/grafo.png'
import LogoDecorator from '@assets/logo-decorator.png'

import styles from './styles.module.css'

export function HomePublica() {
  return (
    <main className={styles.container}>
      <div className={styles.intro}>
        <div>
        <h1>A vantagem do futuro começa aqui.</h1>
          <img src={LogoDecorator} alt="Logo Node Bounty" />
        </div>
        <img src={Grafo} alt="Grafo de vantagens Node Bounty" />
      </div>
    </main>
  )
}
