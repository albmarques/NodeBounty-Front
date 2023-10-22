/* eslint-disable no-unsafe-finally */
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { api } from '@lib/api'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import styles from './styles.module.css'

const schema = z.object({
  nome: z
    .string({ required_error: 'Esse campo é obrigatório' })
    .refine((name) => name.trim().length, {
      message: 'Digite um nome válido.',
    }),
  endereco: z.string({ required_error: 'Esse campo é obrigatório' }),
  cep: z
    .string({ required_error: 'Esse campo é obrigatório' })
    .refine((cep) => cep.trim().replace(/_/gi, '').length === 9, {
      message: 'Digite um CEP válido',
    }),
  numero: z.string({ required_error: 'Esse campo é obrigatório' }),
  telefone: z
    .string({ required_error: 'Esse campo é obrigatório' })
    .refine((telefone) => telefone.trim().replace(/_/gi, '').length === 17, {
      message: 'Digite um telefone válido',
    }),
  senha: z
    .string({ required_error: 'Esse campo é obrigatório' })
    .min(8, 'A senha deve conter no mínimo 8 caracteres'),
})

export function FormUpdate({ idCliente }) {
  const [isLoading, setIsLoading] = useState(true)

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: async () => {
      let dataCliente
      try {
        setIsLoading(true)
        const { data } = await api.get('/clientes')
        const cliente = data.filter(
          (cliente) => cliente.idCliente === idCliente,
        )
        dataCliente = cliente
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
        console.log(dataCliente[0])
        return {
          nome: dataCliente[0].nome || '',
          cep: dataCliente[0].cep || '',
          endereco: dataCliente[0].endereco || '',
          numero: String(dataCliente[0].numero) || '',
          telefone: dataCliente[0].telefone || '',
          senha: '',
        }
      }
    },
  })

  async function handleAtualizarUsuario(data) {
    try {
      await api.put('/clientes', { idCliente, ...data })
    } catch (error) {
      alert('Um erro ocorreu, por favor tente novamente')
      console.log(error)
    }
  }

  return (
    <main className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>Atualizar Dados</h1>
          <form
            className={styles.form}
            onSubmit={handleSubmit(handleAtualizarUsuario)}
          >
            <div>
              <Controller
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Nome Completo"
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errors={errors.nome?.message}
                  />
                )}
                control={control}
              />
              <Controller
                name="cep"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="CEP"
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errors={errors.cep?.message}
                    placeholder="01234-567"
                    mask="99999-999"
                  />
                )}
                control={control}
              />
              <Controller
                name="endereco"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Endereço"
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errors={errors.endereco?.message}
                  />
                )}
                control={control}
              />
              <Controller
                name="numero"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Numero"
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errors={errors.numero?.message}
                  />
                )}
                control={control}
              />
            </div>
            <div>
              <Controller
                name="telefone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    label="Telefone"
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errors={errors.telefone?.message}
                    placeholder="+55 11 99999-9999"
                    mask="+5\5 99 99999-9999"
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
              <Button
                titulo="Concluir"
                tipo="primario"
                type="submit"
                style={{
                  maxWidth: '20rem',
                  alignSelf: 'center',
                  width: '100%',
                }}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </>
      )}
    </main>
  )
}
