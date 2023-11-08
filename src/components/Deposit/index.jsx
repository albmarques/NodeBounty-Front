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

import styles from './styles.module.css';
export function Deposit() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({
        resolver: zodResolver(schema)
      })

    const { showToast, ToastComponents } = useToast()

    async function handleDepositar(data) {
        // try {
        //     await api.post('/transacoes/depositar', data)
        //     showToast()
        //   } catch (error) {
        //     const isAppError = error instanceof AppError
        //     const title = isAppError ? error.message : 'Erro no servidor.'
        //     const description = 'Tente novamente mais tarde.'
      
        //     showToast(title, description, true)
        //   }
    }

    return (
<div className={`mt-5 ${styles.mainContainer}`} >
            <h1 className=''>Depositar
            </h1>
            <div class="row mt-4">
                <div class="col-12">
                    <div className={styles.withdrawContainer}>
                        <div className={styles.font}>Saldo</div>
                        <div className={styles.font}>R$1000.00</div>
                            <div className={styles.questionValue}>Informe o valor do depósito a ser efetuado:</div>
                            <form onSubmit={handleSubmit(handleDepositar)}>
                            <input className={styles.value} {...register('valor')} />
                            {errors.valor && <p className={styles.errorMessage}>{errors.valor.message}</p>}
                        <input type="submit" className={styles.button} value="Depositar" />
                        </form>
                    </div>
                </div>
            </div>
            {ToastComponents}
        </div>
        

        /*
        <div class="container mt-5">
            <h1 className=''>Depositar
            </h1>
            <div class="row mt-4">
                <div class="col-6">
                    <div className={styles.withdrawContainer}>
                        <div className={styles.font}>Saldo</div>
                        <div className={styles.font}>R$1000.00</div>
                        <div class="row">
                            <div className={styles.questionValue}>Informe o valor do saque a ser efetuado:</div>
                        </div>
                        <form onSubmit={handleSubmit(handleDepositar)}>
                            <input className={styles.value} {...register('valor')} />
                            {errors.valor && <p className={styles.errorMessage}>{errors.valor.message}</p>}
                            <Button
                                titulo="Depositar"
                            />
                        </form>
                    </div>

                </div>
            </div>

            {ToastComponents}
        </div>*/
    )
}