import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const schema = z.object({
  initialInvestment: z.coerce
    .number()
    .min(5000, 'O investimento inicial mínimo deve ser de R$ 5000'),
  monthlyInvestment: z.coerce.number(),
  amountOfMonths: z.coerce
    .number()
    .min(3, 'O tempo mínimo de investimento é de 3 meses'),
})

export function Invest() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      initialInvestment: 5000,
      monthlyInvestment: 300,
      amountOfMonths: 24,
    },
  })

  function handleEstimateInvestment(data) {
    const rentabilidadeMensal = 0.01 // Mensal de 1% ao mês
    let saldo = data.initialInvestment

    // Adicionando os investimentos mensais ao saldo
    for (let i = 0; i < data.amountOfMonths; i++) {
      saldo += data.monthlyInvestment

      const rendimentoMensal = saldo * rentabilidadeMensal
      saldo += rendimentoMensal
    }
    alert(
      saldo.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }),
    )
  }

  return (
    <main className={styles.containerInvestment}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleEstimateInvestment)}
      >
        <Controller
          name="initialInvestment"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Valor de investimento inicial"
              type="number"
              min={5000}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.initialInvestment?.message}
            />
          )}
          control={control}
        />
        <Controller
          name="monthlyInvestment"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Valor de investimento mensal"
              type="number"
              min={0}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.monthlyInvestment?.message}
            />
          )}
          control={control}
        />
        <Controller
          name="amountOfMonths"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Quanto meses pretende deixar o dinheiro investido?"
              type="number"
              min={3}
              max={360}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.amountOfMonths?.message}
            />
          )}
          control={control}
        />
        <Button
          titulo="Calcular Investimento"
          tipo="primario"
          type="submit"
          style={{
            maxWidth: '20rem',
            alignSelf: 'center',
            width: '100%',
          }}
          disabled={isSubmitting}
        />
      </form>
    </main>
  )
}
