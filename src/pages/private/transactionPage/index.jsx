import { Deposit } from '../../../components/Deposit';
import { Transfer } from '../../../components/Transfer';
import styles from './styles.module.css';
import { Withdraw } from "@components/Withdraw";
import React, { useState } from 'react';

export function TransactionPage() {
  const [activeComponent, setActiveComponent] = useState('Withdraw');



  const renderComponent = () => {
    if (activeComponent === 'Withdraw') {
      return <Withdraw />;
    } else if (activeComponent === 'Deposit') {
      return <Deposit />;
    } else if (activeComponent === 'Transfer') {
      return <Transfer />
    }
  };

  return (
    <div>
      {renderComponent()}

      <div className={`mt-4 ${styles.mainContainer}`}>
        <button
          className={`${styles.leftButton} ${activeComponent === 'Withdraw' ? styles.activeButton : ''}`}
          onClick={() => setActiveComponent('Withdraw')}
        >
          Sacar
        </button>
        <button
          className={`${styles.centerButton} ${activeComponent === 'Deposit' ? styles.activeButton : ''}`}
          onClick={() => setActiveComponent('Deposit')}
        >
          Depositar
        </button>
        <button
          className={`${styles.rightButton} ${activeComponent === 'Transfer' ? styles.activeButton : ''}`}
          onClick={() => setActiveComponent('Transfer')}
        >
          Transferir
        </button>
      </div>
    </div>
  );
}
