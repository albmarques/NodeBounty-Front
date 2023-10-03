import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import dayjs from 'dayjs'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const schema = z
  .object({
    Nome: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((name) => name.trim().length, {
        message: 'Digite um nome válido.',
      }),
    DataNascimento: z.string({ required_error: 'Esse campo é obrigatório' }),
    Rg: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((rg) => rg.trim().replace(/_/gi, '').length === 12, {
        message: 'Digite um RG válido',
      }),
    Cpf: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((cpf) => cpf.trim().replace(/_/gi, '').length === 14, {
        message: 'Digite um CPF válido',
      }),
    Cep: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((cep) => cep.trim().replace(/_/gi, '').length === 9, {
        message: 'Digite um CEP válido',
      }),
    Endereco: z.string({ required_error: 'Esse campo é obrigatório' }),
    Numero: z.string({ required_error: 'Esse campo é obrigatório' }),
    Telefone: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .refine((telefone) => telefone.trim().replace(/_/gi, '').length === 17, {
        message: 'Digite um telefone válido',
      }),
    Email: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .email('E-mail inválido'),
    Senha: z
      .string({ required_error: 'Esse campo é obrigatório' })
      .min(8, 'A senha deve conter no mínimo 8 caracteres'),
    ConfirmarSenha: z.string({ required_error: 'Esse campo é obrigatório' }),
  })
  .refine((schema) => schema.Senha === schema.ConfirmarSenha, {
    message: 'As senhas não coincidem',
    path: ['ConfirmarSenha'],
  })
  .refine(
    (schema) => dayjs(schema.DataNascimento).isBefore(new Date(), 'date'),
    {
      message:
        'A data de nascimento não pode ser superior ou igual a data atual',
      path: ['DataNascimento'],
    }
  )

export function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()

  async function handleCadastrarUsuario({
    Nome,
    DataNascimento,
    Rg,
    Cpf,
    Cep,
    Endereco,
    Numero,
    Telefone,
    Email,
    Senha,
  }) {
    try {
      await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nome,
          Endereco,
          Cep,
          Numero,
          Rg,
          Cpf,
          DataNascimento,
          Telefone,
          Email,
          Senha,
        }),
      })
      navigate('/login')
    } catch (error) {
      alert('Um erro ocorreu, por favor tente novamente')
      console.log(error)
    }
  }

  return (
    <main className={styles.container}>
      <h1>Abrir conta</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(handleCadastrarUsuario)}
      >
        <div>
          <Controller
            name="Nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Nome Completo"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Nome?.message}
              />
            )}
            control={control}
          />
          <Controller
            name="DataNascimento"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Data de Nascimento"
                type="date"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.DataNascimento?.message}
              />
            )}
            control={control}
          />
          <Controller
            name="Rg"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="RG"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Rg?.message}
                placeholder="12.345.678-9"
                mask="99.999.999-*"
              />
            )}
            control={control}
          />
          <Controller
            name="Cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="CPF"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Cpf?.message}
                placeholder="123.456.789-10"
                mask="999.999.999-99"
              />
            )}
            control={control}
          />
          <Controller
            name="Cep"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="CEP"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Cep?.message}
                placeholder="01234-567"
                mask="99999-999"
              />
            )}
            control={control}
          />
          <Controller
            name="Endereco"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Endereço"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Endereco?.message}
              />
            )}
            control={control}
          />
          <Controller
            name="Numero"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Numero"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Numero?.message}
              />
            )}
            control={control}
          />
        </div>
        <div>
          <Controller
            name="Telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Telefone"
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Telefone?.message}
                placeholder="+55 11 99999-9999"
                mask="+5\5 99 99999-9999"
              />
            )}
            control={control}
          />
          <Controller
            name="Email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="E-mail"
                type="email"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Email?.message}
              />
            )}
            control={control}
          />
          <Controller
            name="Senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Senha"
                type="password"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.Senha?.message}
              />
            )}
            control={control}
          />
          <Controller
            name="ConfirmarSenha"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirmar Senha"
                type="password"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                errors={errors.ConfirmarSenha?.message}
              />
            )}
            control={control}
          />
          <Button
            titulo="Concluir"
            tipo="primario"
            type="submit"
            style={{ maxWidth: "20rem", alignSelf: "center", width: "100%" }}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </main>
  )
}
