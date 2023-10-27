import { User } from '../../types/user'
import { UserListItem } from '../UserListItem'
import './styles.scss'

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  return (
    <ul className="users-list">
      {users.map((user) => (
        <UserListItem user={user} key={user.id} />
      ))}
    </ul>
  )
}
