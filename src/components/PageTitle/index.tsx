import perfilImg from '../../assets/perfil-icon.png'
import './styles.scss'

export function PageTitle() {
  return (
    <div className="page-title">
      <img src={perfilImg} alt="Icone de Perfil" />
      <h2>Painel de clientes</h2>
    </div>
  )
}
