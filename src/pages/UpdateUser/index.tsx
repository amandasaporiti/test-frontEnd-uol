import './styles.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'

const updateUserSchema = z.object({
  name: z.string().min(1, 'Digite um nome válido'),
  cpf: z.string().min(1, 'Digite um CPF válido'),
  phone: z.string().min(1, 'Digite um Telefone válido'),
  email: z
    .string()
    .email('Digite um nome válido')
    .min(1, 'Digite um nome válido'),
  status: z.string(),
})

type UpdateUserInputType = z.infer<typeof updateUserSchema>

export function UpdateUser() {
  const {
    state: { user },
  } = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserInputType>({
    resolver: zodResolver(updateUserSchema),
  })

  const { updateUser, statusOptions, formatPhone } = useContext(UserContext)

  const navigate = useNavigate()

  function handleUpdateUser(data: UpdateUserInputType) {
    const { name, email, cpf, phone, status } = data
    const formattedPhone = formatPhone(phone)
    updateUser({
      id: user.id,
      name,
      email,
      cpf,
      phone: formattedPhone,
      status,
    })
    toast.success('Usuário editado com sucesso')
    navigate('/')
  }

  return (
    <div className="update-user-container">
      <div className="header-page">
        <strong>Novo usuário</strong>
        <span>Informe os campos a seguir para criar novo usuário:</span>
      </div>
      <form
        className="update-user-form"
        onSubmit={handleSubmit(handleUpdateUser)}
      >
        <div>
          <input
            type="text"
            placeholder="Nome"
            defaultValue={user.name}
            {...register('name')}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Email"
            defaultValue={user.email}
            {...register('email')}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="CPF"
            defaultValue={user.cpf}
            {...register('cpf')}
          />
          <p>{errors.cpf?.message}</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Telefone"
            defaultValue={user.phone}
            {...register('phone')}
          />
          <p>{errors.phone?.message}</p>
        </div>
        <div>
          <select
            {...register('status')}
            defaultValue={user.status}
            className="select-style"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p>{errors.status?.message}</p>
        </div>

        <div className="buttons-container">
          <button className="update-button" type="submit">
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
