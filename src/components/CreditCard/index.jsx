import styles from './styles.module.css'
import eye from '@assets/olho.png';
const mascara= "****";
function usarMascara(){
  
}
export function CreditCard({ numeroCartao, validadeCartao, cvcCartao }) {
  return (
    <div class={" container mt-5"}>
      <div class="row justify-content-center">
        <div class="col-lg-4 col-md-8 col-sm-10 col-12">
          <div class={styles.cardContainer}>
            <div class={styles.cardContent}>
            <div class={styles.cardNumber}>
              
              {mascara/*numeroCartao.substr(0, 4)*/ +
                " " +
               mascara /*numeroCartao.substr(4, 4)*/ +
                " " +
                numeroCartao.substr(8, 4) +
                " " +
                numeroCartao.substr(12, 4)}
              </div>
                 <img class={styles.eye}src={eye} />
                 </div>
            
           
            <div class={styles.expirationCvv}>
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
