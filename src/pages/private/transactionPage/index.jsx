import { Deposit } from '../../../components/Deposit';
import styles from './styles.module.css'
import {Withdraw} from "@components/Withdraw"
export function TransactionPage(){
    return(
        <div>
            <Withdraw/>
            <Deposit />            
        </div>
    );
}