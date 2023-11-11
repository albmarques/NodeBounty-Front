import { useNavigate } from 'react-router-dom'

import FATLogo from '@assets/fundacaoFAT.png'
import BancoBrasilLogo from '@assets/bancoBrasil.png'
import FATECLogo from '@assets/fatec.png'

import { Button } from '@components/Button'
import styles from './styles.module.css'

export function Sobre() {
  const navigate = useNavigate()
  return (
    <main className={styles.container}>
      <div className={styles.benefits}>
        <h2>O Node Bounty</h2>
        <div className={styles.benefitCard}>
          <div>
            <p>
              O node bounty é um projeto de fintech prototipado e desenvolvido
              no segundo semestre de Desenvolvimento de Software Multiplataforma
              da Fatec Zona Leste por alunos com um enorme interesse por
              tecnologia que visam a qualificação para a entrada no mercado de
              trabalho. O intento em centrar nossos esforços em um projeto de
              fintech é a inevitabilidade de nichar nossos estudos, explorando
              ao máximo linguagens, bibliotecas e frameworks que corroborem com
              o progresso de aprendizado. Com o boom dos serviços financeiros no
              Brasil, a reinvenção se fez necessária. O que distingue o Node
              Bounty das demais conveniências financeiras é a possibilidade de
              integrar o advento das redes sociais em benefícios e vantagens
              reais. Buscamos oferecer um suporte nunca antes fornecido aos
              criadores de conteúdo com um segmento bem delineado. Somos o
              diferencial econômico requisitado para impulsionar a visibilidade
              daqueles que fazem uso das redes sociais.
            </p>
            <p>
              Uma fintech (tecnologia financeira) é caracterizada como uma
              empresa/startup que desenvolve produtos financeiros digitais,
              sendo o uso da tecnologia o principal diferencial em relação às
              corporações tradicionais do mundo financeiro. É visível que a
              popularização e a disseminação da internet ditou as regras de um
              novo jogo. Um novo cenário de competição foi criado em vários
              setores da economia. Ficou mais fácil testar e criar novos
              produtos por meio dos canais digitais.
            </p>
          </div>
          <Button
            titulo="FAQ"
            tipo="secundario"
            onClick={() => navigate('/ajuda')}
          />
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
