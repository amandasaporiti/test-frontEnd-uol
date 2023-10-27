import './styles.scss'
import { User } from '../../types/user'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

interface UserListItemProps {
  user: User
}

export function UserListItem({ user }: UserListItemProps) {
  const { setFirstLetterToUpperCase } = useContext(UserContext)
  function handleUpdateUser(user: User) {
    navigate(`/editar-usuario/${user.id}`, {
      state: {
        user,
      },
    })
  }

  const navigate = useNavigate()
  return (
    <li className="user-data" key={user.id}>
      <div>
        <p>{user.name}</p>
        <span>{user.email}</span>
      </div>
      <div>
        <p>{user.cpf}</p>
        <span>{user.phone}</span>
      </div>
      <div>
        <span className={`status-highlight ${user.status}`}>
          {setFirstLetterToUpperCase(user.status)}
        </span>
      </div>
      <button onClick={() => handleUpdateUser(user)}>Editar</button>
    </li>
  )
}
