import './styles.scss'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { v4 as uuidV4 } from 'uuid'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'

const createUserSchema = z.object({
  name: z.string().min(1, 'Campo de Nome é obrigatório'),
  cpf: z.string().min(1, 'Campo de CPF é obrigatório'),
  phone: z.string().min(1, 'Campo de Telefone é obrigatório'),
  email: z
    .string()
    .email('Digite um E-mail válido')
    .min(1, 'Campo de E-mail é obrigatório'),

  status: z.string().min(1, 'Campo de Status é obrigatório'),
})

type CreateUserInputType = z.infer<typeof createUserSchema>

export function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserInputType>({
    resolver: zodResolver(createUserSchema),
  })

  const { createUser, statusOptions, formatPhone } = useContext(UserContext)

  const navigate = useNavigate()

  function handleCreateUser(data: CreateUserInputType) {
    const { name, cpf, email, phone, status } = data

    const formattedPhone = formatPhone(phone)

    createUser({
      id: uuidV4(),
      name,
      cpf,
      email,
      phone: formattedPhone,
      status,
    })
    toast.success('Usuário criado com sucesso')
    navigate('/')
  }

  return (
    <div className="create-user-container">
      <div className="header-page">
        <strong>Novo usuário</strong>
        <span>Informe os campos a seguir para criar novo usuário:</span>
      </div>
      <form
        className="create-user-form"
        onSubmit={handleSubmit(handleCreateUser)}
        noValidate
      >
        <div>
          <input type="text" placeholder="Nome" {...register('name')} />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <input type="email" placeholder="Email" {...register('email')} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <input type="text" placeholder="CPF" {...register('cpf')} />
          <p>{errors.cpf?.message}</p>
        </div>
        <div>
          <input type="text" placeholder="Telefone" {...register('phone')} />
          <p>{errors.phone?.message}</p>
        </div>
        <div>
          <div>
            <select
              {...register('status')}
              className="select-style"
              defaultValue={''}
            >
              <option value="" disabled>
                Status..
              </option>
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p>{errors.status?.message}</p>
          </div>
        </div>
        <div className="buttons-container">
          <button className="create-button" type="submit">
            Criar
          </button>
          <button
            className="go-back-button"
            type="button"
            onClick={() => navigate('/')}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  )
}
