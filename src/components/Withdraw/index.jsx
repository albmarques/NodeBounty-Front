import styles from './styles.module.css';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { api } from '@lib/api'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'

const schema = z.object({
    valor: z.coerce
      .number()
      .min(0.01, 'O valor mínimo para depósito é de 1 centavo'),
})

export function Withdraw() {
    return (
        <div className={`mt-5 ${styles.mainContainer}`} >
            <h1 className=''>Sacar
            </h1>
            <div class="row mt-4">
                <div class="col-12">
                    <div className={styles.withdrawContainer}>
                        <div className={styles.font}>Saldo</div>
                        <div className={styles.font}>R$1000.00</div>
                            <div className={styles.questionValue}>Informe o valor do saque a ser efetuado:</div>
                        <input className={styles.value} type="text" name="" id="" />
                        <input type="button" className={styles.button} value="Sacar" />
                    </div>
                </div>
            </div>
        </div>

    )
}