import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { UserContextProvider } from './contexts/UserContext'
import { ToastContainer } from 'react-toastify'
import './styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <ToastContainer autoClose={2000} theme="colored" />
    </UserContextProvider>
  )
}
