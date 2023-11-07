import styles from './styles.module.css';
export function Withdraw() {
    return (
        <div class="container mt-5">
            <h1 className=''>Sacar
            </h1>
            <div class="row mt-2">
                <div class="col-6">
                    <div className={styles.withdrawContainer}>
                        <div className={styles.font}>Saldo</div>
                        <div className={styles.font}>R$1000.00</div>
                        <div class="row">
                            <div className={styles.questionValue}>Informe o valor do saque a ser efetuado:</div>
                        </div>
                        <input className={styles.questionValue} type="text" name="" id="" />
                    </div>
                    

                </div>
            </div>
        </div>

    )
}