import styles from './styles.module.css'

export function CreditCard({ numeroCartao, validadeCartao, cvcCartao }) {
  return (
    <div className={styles.cardContainer + ' container mt-5'}>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12">
          <div className={styles.cardContainer}>
            <div className={styles.cardNumber}>{numeroCartao}</div>
            <div className={styles.expirationCvv}>
              <div>
                <div>Data Exp.</div>
                <div>{String(validadeCartao)}</div>
              </div>
              <div>
                <div>CVV</div>
                <div>{cvcCartao}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
