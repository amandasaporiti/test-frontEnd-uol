import { createContext, ReactNode, useState, useEffect } from 'react'
import { api } from '../services/api'
import { v4 as uuidV4 } from 'uuid'
import { User } from '../types/user'

interface UserContextProviderProps {
  children: ReactNode
}

interface StatusOptions {
  value: string
  label: string
}

interface UserContextData {
  newUsersArray: User[]
  createUser: (newUser: User) => void
  updateUser: (newUser: User) => void
  setFirstLetterToUpperCase: (status: string) => string
  statusOptions: StatusOptions[]
  formatPhone: (inputText: string) => string
}

export const UserContext = createContext({} as UserContextData)

export function UserContextProvider({ children }: UserContextProviderProps) {
  const [users, setUsers] = useState<User[]>([])

  async function fetchUsers() {
    try {
      const { data } = await api.get('/users')
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const storedUsers = localStorage.getItem('@UolHost:users')
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers))
    } else {
      fetchUsers()
    }
  }, [])

  const newUsersArray = users.map((data) => {
    return { ...data, id: uuidV4() }
  })

  function createUser(newUser: User) {
    setUsers((users) => [...users, newUser])

    localStorage.setItem('@UolHost:users', JSON.stringify([...users, newUser]))
  }

  function updateUser(updatedUser: User) {
    const updatedUsers = newUsersArray.map((user) => {
      if (user.id === updatedUser.id) {
        return { ...updatedUser }
      }
      return user // return users that don't need to be updated
    })

    setUsers(updatedUsers)
  }

  function setFirstLetterToUpperCase(status: string) {
    return status && status[0].toUpperCase() + status.slice(1)
  }

  const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'desativado', label: 'Desativado' },
    { value: 'aguardando', label: 'Aguardando' },
    { value: 'inativo', label: 'Inativo' },
  ]

  const formatPhone = (inputTextField: string) => {
    // Remove caracteres não numéricos
    const numericValue = inputTextField.replace(/\D/g, '')

    const formattedPhone = numericValue.replace(
      /(\d{2})(\d{5})(\d{4})/,
      '($1)$2-$3',
    )

    return formattedPhone
  }

  return (
    <UserContext.Provider
      value={{
        newUsersArray,
        createUser,
        updateUser,
        setFirstLetterToUpperCase,
        statusOptions,
        formatPhone,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
