import './styles.scss'
import { UserList } from '../../components/UserList'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

export function Dashboard() {
  const { newUsersArray } = useContext(UserContext)
  const navigate = useNavigate()

  return (
    <main className="dashboard-container">
      <div className="list-users-header">
        <div>
          <strong>Listagem de usuários</strong>
          <span>Escolha um cliente para visualizar os detalhes</span>
        </div>
        <button onClick={() => navigate('/criar-usuario')}>Novo cliente</button>
      </div>
      <UserList users={newUsersArray} />
      <h2>Exibindo {newUsersArray.length} clientes</h2>
    </main>
  )
}
