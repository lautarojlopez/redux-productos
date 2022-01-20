import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {editarProducto} from '../actions/productoActions'
import {useNavigate} from 'react-router-dom'

const EditarProducto = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  //State
  const [producto, setProducto] = useState({
    nombre: '',
    producto: ''
  })
  const {nombre, precio} = producto

  const productoEditar = useSelector((state) => {
    return state.productos.productoeditar
  })

  useEffect(() => {
    setProducto(productoEditar)
  }, [productoEditar])

  const submitEditarProducto = (e) => {
    e.preventDefault()
    dispatch( editarProducto(producto) )
    navigate('/')
  }

  const onChangeForm = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  return(
    <div className="flex justify-center">
      <form onSubmit={submitEditarProducto} className="p-5 rounded-lg shadow border-2 border-opacity-50 w-6/12">
        <h2 className="py-3 text-center text-3xl">Editar Producto</h2>
        <div className="flex flex-col pb-5">
          <label className="text-teal-500">Nombre</label>
          <input
            value={nombre}
            onChange={onChangeForm}
            placeholder="Nombre del producto"
            type="text"
            name="nombre"
            className="rounded border shadow p-2 focus:outline-none focus:ring focus:ring-teal-100"/>
        </div>
        <div className="flex flex-col pb-5">
          <label className="text-teal-500">Precio</label>
          <input
            value={precio}
            onChange={onChangeForm}
            placeholder="$"
            type="number"
            name="precio"
            className="rounded border shadow p-2 focus:outline-none focus:ring focus:ring-teal-100"/>
        </div>
        <button type="submit" className="w-full p-2 shadow-md rounded bg-teal-500 text-white text-xl hover:bg-teal-400 transition-all duration-150 ease-linear">Guardar <i className="fas fa-save"></i></button>
      </form>
    </div>
  )

}

export default EditarProducto
