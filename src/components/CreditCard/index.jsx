import React, { useState } from 'react';
import styles from './styles.module.css';
import eye from '@assets/eye.svg'; // Ícone do olho aberto
import eyeSlash from '@assets/eye-slash.svg'; // Ícone do olho fechado

export function CreditCard({ numeroCartao, validadeCartao, cvcCartao }) {
  const [isMasked, setIsMasked] = useState(true);

  const handleMaskToggle = () => {
    setIsMasked(!isMasked);
  };

  const formatCardNumber = (numeroCartao) => {
    // Adiciona espaços a cada 4 dígitos para manter o espaçamento.
    return numeroCartao.replace(/(\d{4})/g, '$1 ');
  };

  const maskCardNumber = (numeroCartao) => {
    if (isMasked) {
      // Mantém o espaçamento e mascara os primeiros 12 dígitos.
      return '•••• •••• •••• ' + numeroCartao.substr(12, 4);
    } else {
      return formatCardNumber(numeroCartao);
    }
  };

  const maskCvc = (cvcCartao) => {
    if (isMasked) {
      // Máscara o CVV.
      return '•••';
    } else {
      return cvcCartao;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="tamanho">
          <div className={styles.cardContainer}>
            <div className={styles.cardContent}>
            <div className={styles.cardNumber}>
  {maskCardNumber(numeroCartao)}
  <a onClick={handleMaskToggle}>
    <img className={styles.eye} src={isMasked ? eyeSlash : eye} alt="Toggle Card Number" />
  </a>
</div>
            </div>
            <div className={styles.expirationCvv}>
              <div>
                <div>Data Exp.</div>
                <div>{validadeCartao.substr(5, 5)}</div>
              </div>
              <div>
                <div>CVV</div>
                <div>{maskCvc(cvcCartao)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
