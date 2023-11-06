import styles from './styles.module.css';
export function Withdraw() {
    return (
        <div class="container mt-5">
            <h1 className=''>Sacar
            </h1>
            <div class="row mt-2">
                <div class="col-6">
                    <div className={styles.withdrawContainer}>
                        <div className={styles.font}>saldo</div>
                        <div className={styles.font}>valor</div>
                        <div class="row">
                            <div className={styles.font}>Informe o valor do saque a ser efetuado:</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}