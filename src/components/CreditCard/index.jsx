import styles from './styles.module.css'

export function CreditCard({ numeroCartao, validadeCartao, cvcCartao }) {
  return (
    <div className={styles.cardContainer + ' container mt-5'}>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10 col-12">
          <div className={styles.cardContainer}>
            <div className={styles.cardNumber}>
              {numeroCartao.substr(0, 4) +
                ' ' +
                numeroCartao.substr(4, 4) +
                ' ' +
                numeroCartao.substr(8, 4) +
                ' ' +
                numeroCartao.substr(12, 4)}
            </div>
            <div className={styles.expirationCvv}>
              <div>
                <div>Data Exp.</div>
                <div>{validadeCartao.substr(5, 5)}</div>
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
