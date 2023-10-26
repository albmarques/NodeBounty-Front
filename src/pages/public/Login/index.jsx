import { useContext } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Link, useNavigate } from 'react-router-dom'

import { api } from '@lib/api'
import { authContext } from '@contexts/AuthContext'
import { useToast } from '@hooks/useToast'
import { AppError } from '@utils/AppError'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const schema = z.object({
  email: z
    .string({ required_error: 'Esse campo é obrigatório' })
    .email('E-mail inválido'),
  senha: z.string({ required_error: 'Esse campo é obrigatório' }),
})

export function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()
  const { saveToken } = useContext(authContext)
  const { showToast, ToastComponents } = useToast()

  async function handleRealizarLogin(formData) {
    try {
      const { data } = await api.post('/clientes/login', formData)
      saveToken(data.token)
      navigate('/planos')
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Erro no servidor.'
      const description = isAppError
        ? 'Verifique os dados e tente novamente.'
        : 'Tente novamente mais tarde.'

      showToast(title, description, true)
    }
  }

  return (
    <main className={styles.container}>
      <h1>Acesso</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleRealizarLogin)}
      >
        <Controller
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="E-mail"
              type="email"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.email?.message}
            />
          )}
          control={control}
        />
        <Controller
          name="senha"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Senha"
              type="password"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              errors={errors.senha?.message}
            />
          )}
          control={control}
        />
        <Link to="/" className={styles.passwordRecovery}>
          Esqueci minha senha
        </Link>
        <Button
          titulo="Entrar"
          tipo="primario"
          type="submit"
          style={{ maxWidth: '20rem', alignSelf: 'center', width: '100%' }}
          disabled={isSubmitting}
        />
        <Button
          titulo="Abra sua conta"
          tipo="primario"
          type="button"
          style={{ maxWidth: '20rem', alignSelf: 'center', width: '100%' }}
          disabled={isSubmitting}
          onClick={() => navigate('/cadastro')}
        />
      </form>

      {ToastComponents}
    </main>
  )
}
