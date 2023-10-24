import Logo from '@assets/logo-branca.svg'
import styles from './styles.module.css'

export function Footer() {
  return (
    <footer>
      <div className={styles.container}>
        <div>
          <img src={Logo} alt="Logo do Node Bounty" />
        </div>
        <div className={styles.flex}>
          <ul>
            <li>Contato</li>
            <li>Atendimento 24h</li>
            <li>Chat no aplicativo</li>
            <li>9999-9999 (Regiões metropolitanas)</li>
            <li>0800-000-000 (Demais localidades)</li>
            <li>WhatsApp: 11 0000-0000 </li>
            <li>(Não é preciso inserir o dígito 9 antes do número)</li>
          </ul>
          <ul>
            <li>Reclamações, sugestões e elogios: 0800-000-0000</li>
            <li>SAC - Deficiência auditiva ou de fala: 0800-000-0000</li>
            <li>
              Horário de funcionamento: 24 horas por dia, 7 dias por semana
            </li>
            <li>Se não ficou satisfeito, ligue para: 0800-000-0000</li>
            <li>
              Horário de funcionamento: De segunda a sexta-feira (exceto
              feriados), das 9h às 18h
            </li>
          </ul>
        </div>
      </div>
      <p className={styles.disclaimer}>
        Node Bounty - Todos os direitos reservados{' '}
      </p>
    </footer>
  )
}
