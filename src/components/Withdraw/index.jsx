import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, useContext, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@lib/api';
import { useToast } from '@hooks/useToast';
import { AppError } from '@utils/AppError';

import styles from './styles.module.css';

const schema = z.object({
  valor: z.coerce.number().min(0.01, 'O valor mínimo para saque é de 1 centavo'),
});

export function Withdraw() {
  const [dadosConta, setDadosConta] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const loadAccountData = useCallback(async () => {
    try {
      setIsLoading(true)
      const { data } = await api.get('/conta')
      setDadosConta(data)
      setIsLoading(false)
    } catch (error) {
      const isAppError = error instanceof AppError
    }
  }, [navigate])

  // Chamando função para carregar os dados quando a página abrir
  useEffect(() => {
    loadAccountData()
  }, [loadAccountData])
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { showToast, ToastComponents } = useToast();

  async function handleSacar(data) {
  }

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, ''); 
    const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      inputValue / 100
    ); 

    setValue('valor', inputValue / 100); 
    event.target.value = formattedValue; 
  };

  return (
    <div className={`mt-5 ${styles.mainContainer}`}>
      <h1 className=''>Sacar</h1>
      <div className="row mt-4">
        <div className="col-12">
          <div className={styles.withdrawContainer}>
            <div className={styles.font}>Saldo</div>
            <div className={styles.font}>R$ {dadosConta.saldoConta}</div>
            <div className={styles.questionValue}>Informe o valor do saque a ser efetuado:</div>
            <form onSubmit={handleSubmit(handleSacar)}>
              <input
                className={styles.value}
                {...register('valor')}
                onChange={handleInputChange}
                placeholder="R$0,00"
              />
              {errors.valor && errors.valor.message !== 'Expected number, received nan' && (
        <p className={styles.errorMessage}>
          {errors.valor.message}
        </p>
      )}
              <input type="submit" className={styles.button} value="Sacar" />
            </form>
          </div>
        </div>
      </div>
      {ToastComponents}
    </div>
  );
}
