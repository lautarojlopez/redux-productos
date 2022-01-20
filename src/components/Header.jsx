import {Link} from 'react-router-dom'
const Header = () => {

  return(
    <nav className="flex bg-teal-600 text-white py-5 px-3 justify-between items-center">
      <h1 className="text-3xl"><Link to="/">Product CRUD</Link></h1>
      <Link to="/productos/nuevo" className="bg-lime-500 p-3 rounded shadow-lg hover:bg-lime-400 transition-all ease-linear duration-150">Agregar Producto <i className="fas fa-plus-square"></i></Link>
    </nav>
  )

}

export default Header
