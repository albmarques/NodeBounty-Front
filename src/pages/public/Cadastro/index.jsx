import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { Input } from '@components/Input'
import { Button } from '@components/Button'
import styles from './styles.module.css'

const schema = z.object({
    nome: z.string(),
    dataNascimento: z.string(),
    rg: z.string(),
    cpf: z.string().length(11, "O CPF deve ser composto por 11 digitos"),
    cep: z.string().length(8, "O CEP deve ser composto por 11 digitos"),
    endereco: z.string(),
    telefone: z.string(),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
    confirmarSenha: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
})

export function Cadastro() {
    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange'
      })

    function cadastrarUsuario(data) {
        console.log(data)
    }

    return (
        <main className={styles.container}>
            <h1>Abrir conta</h1>
            <form className={styles.form} onSubmit={handleSubmit(cadastrarUsuario)}>
                <div>
                    <Controller
                        name="nome"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="Nome Completo"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.nome?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="dataNascimento"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="Data de Nascimento"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.dataNascimento?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="rg"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="RG"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.rg?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="cpf"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="CPF"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.cpf?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="cep"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="CEP"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.cep?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="endereco"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="Endereço"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.endereco?.message}
                            />
                        )}
                        control={control}
                    />
                </div>
                <div>
                    <Controller
                        name="telefone"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="Telefone"
                                type="text"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.telefone?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="email"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="E-mail"
                                type="email"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.email?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="senha"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="Senha"
                                type="password"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.senha?.message}
                            />
                        )}
                        control={control}
                    />
                    <Controller
                        name="confirmarSenha"
                        render={({field: { onChange, onBlur, value, ref }}) => (
                            <Input
                                label="Confirmar Senha"
                                type="password"
                                onChange={onChange}
                                onBlur={onBlur}
                                value={value}
                                ref={ref}
                                errors={errors.confirmarSenha?.message}
                            />
                        )}
                        control={control}
                    />
                    <Button titulo="Concluir" tipo="primario" type="submit" style={{maxWidth: '20rem', alignSelf: 'center', width: '100%'}} />
                </div>
            </form>
        </main>
    )
}