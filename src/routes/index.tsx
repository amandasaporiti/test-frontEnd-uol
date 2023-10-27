import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import { Dashboard } from '../pages/Dashboard'
import { CreateUser } from '../pages/CreateUser'
import { UpdateUser } from '../pages/UpdateUser'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/criar-usuario" element={<CreateUser />} />
        <Route path="/editar-usuario/:id" element={<UpdateUser />} />
      </Route>
    </Routes>
  )
}
