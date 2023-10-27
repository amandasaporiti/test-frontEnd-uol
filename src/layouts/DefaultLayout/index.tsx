import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

import './styles.scss'
import { PageTitle } from '../../components/PageTitle'

export function DefaultLayout() {
  return (
    <div className="container">
      <Header />
      <PageTitle />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
