import { Deposit } from '../../../components/Deposit';
import styles from './styles.module.css';
import {Withdraw} from "@components/Withdraw"
import React, { useState } from 'react';

export function TransactionPage(){
    const [activeComponent, setActiveComponent] = useState('Withdraw');

  const renderComponent = () => {
    if (activeComponent === 'Withdraw') {
      return <Withdraw />;
    } else if (activeComponent === 'Deposit') {
      return <Deposit />;
    }
  };

  return (
    <div>
      

      {renderComponent()}

      <div className={`mt-2 ${styles.mainContainer}`}>
        <button onClick={() => setActiveComponent('Withdraw')}>Sacar</button>
        <button onClick={() => setActiveComponent('Deposit')}>Depósito</button>
      </div>
    </div>
  );
}

