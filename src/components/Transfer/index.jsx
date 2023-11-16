import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useState, useContext, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@lib/api';
import { useToast } from '@hooks/useToast';
import { AppError } from '@utils/AppError';


const schema = z.object({
  valor: z.coerce.number().min(0.01, 'O valor mínimo para depósito é de 1 centavo'),
  numeroConta: z.string().length(20, 'O número da conta precisa ter 20 dígitos')
});

import styles from './styles.module.css';

export function Transfer() {
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

  async function handleDepositar(data) {
    console.log(data.valor)
    try {
      const response = await api.post('/transacoes/transferir', data);
      
      if (response.status === 200) {
        console.log('Transferência realizada com sucesso:', response.data);
        showToast('Transferência realizada com sucesso', 'sucesso');
        loadAccountData();
      } else {
        console.error('Status de resposta inesperado:', response.status);
        showToast('Erro ao transferir. Por favor, tente novamente.', 'erro');
      }
    } catch (error) {
      console.error('Erro ao transferir:', error);
      showToast('Erro ao transferir. Por favor, tente novamente.', 'erro');
    }
  }
  
/*
ERRO conflito com a linha 11 
const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, ''); 
    const numericValue = parseFloat(inputValue / 100).toFixed(2); 
  
    const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
      numericValue
    ); 
  
    setValue('valor', numericValue); 
    event.target.value = formattedValue; 
  };*/

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, ''); 
    const numericValue = parseFloat(inputValue / 100).toFixed(2); 
    
    setValue('valor', numericValue); 
    event.target.value = numericValue; 
  };
  

  return (
    <div className={`mt-5 ${styles.mainContainer}`}>
      <h1 className=''>Transferir</h1>
      <div class="row mt-4">
        <div class="col-12">
          <div className={styles.withdrawContainer}>
            <div className={styles.font}>Saldo</div>
            <div className={styles.font}>R$ {dadosConta.saldoConta}</div>
            <div className={styles.questionValue}>Valor da transferência a ser efetuado:</div>
            <form onSubmit={handleSubmit(handleDepositar)}>
              <input
                className={styles.value}
                {...register('valor')}
                onChange={handleInputChange}
                placeholder="R$0,00"
              />
              <div className={styles.questionValue2}>Informe a n° da conta:</div>
              <input
                className={styles.value}
                {...register('numeroConta')}
              />
              
              {errors.valor && errors.valor.message !== 'Expected number, received nan' && (
        <p className={styles.errorMessage}>
          {errors.valor.message}
        </p>
      )}
              <input type="submit" className={styles.button} value="Transferir" />
            </form>
          </div>
        </div>
      </div>
      {ToastComponents}
    </div>
  );
}
