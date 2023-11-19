import styles from './styles.module.css';
export function Extract() {
    return (
    <div className={`mt-5 ${styles.mainContainer}`}>
        <h1 className=''>Extrato</h1>
        <div className={styles.extrato}>
          <div className={styles.transacao}>
            <div className={styles.data}>01/01/2023</div>
            <div className={styles.descricao}>Depósito</div>
            <div className={styles.valor}>R$ 1.000,00</div>
          </div>
          <div className={styles.transacao}>
            <div className={styles.data}>05/01/2023</div>
            <div className={styles.descricao}>Compra no Supermercado</div>
            <div className={styles.valor}>- R$ 50,00</div>
          </div>
          <div className={styles.transacao}>
            <div className={styles.data}>10/01/2023</div>
            <div className={styles.descricao}>Saque no Caixa Eletrônico</div>
            <div className={styles.valor}>- R$ 100,00</div>
          </div>
        </div>
      </div>
    );
  }
  