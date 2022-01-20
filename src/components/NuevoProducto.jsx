import { useState } from 'react'
//Redux Actions
import { crearNuevoProductoAction } from '../actions/productoActions'
import { mostrarAlerta } from '../actions/alertaActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NuevoProducto = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //State
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [errorForm, setErrorForm] = useState(false)

  //Acceder al state del store de Redux
  //State de productos
  const loading = useSelector((state) => {
    return state.productos.loading
  })
  const error = useSelector((state) => {
    return state.productos.error
  })
  //State de alertas
  const alertaState = useSelector((state) => {
    return state.alertas.alerta
  })
  console.log(alertaState)

  const agregarProducto = (producto) => {
    dispatch(crearNuevoProductoAction(producto))
  }

  const submitNuevoProducto = async (e) => {
    e.preventDefault()

    //Validar
    if(nombre.trim() === '' || precio<=0){
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        cls: 'text-center text-red-500 font-bold text-xl py-2 my-2 bg-red-100'
      }
      dispatch( mostrarAlerta(alerta) )
      console.log(alertaState);
      setErrorForm(true)
      return
    }else{
      setErrorForm(false)
    }

    //Agregar producto
    await agregarProducto({
      nombre,
      precio
    })
    navigate('/')
  }

  return(

    <div className="flex justify-center">
      <form onSubmit={submitNuevoProducto} className="p-5 rounded-lg shadow border-2 border-opacity-50 w-10/12 md:w-6/12">
        <h2 className="py-3 text-center text-3xl">Agregar Producto</h2>
        {alertaState ? <p className={alertaState.cls}>{alertaState.msg}</p> : null}
        {error ? <p className="text-red-500 text-center text-xl">Ha ocurrido un error</p> : null}
        <div className="flex flex-col pb-5">
          <label className={`${errorForm && nombre.trim() === '' ? "text-red-500" : "text-teal-500" }`}>Nombre</label>
          <input
            placeholder="Nombre del producto"
            type="text"
            name="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            className={`rounded border shadow p-2 focus:outline-none focus:ring focus:ring-teal-100 transition-all ease-linear duration-150 ${errorForm && nombre.trim() === '' ? "border-red-500 bg-red-100" : "border-gray-200"}`}/>
            {errorForm && nombre.trim() === '' ? <p className="text-center text-red-500">Escribe un nombre</p> : null}
        </div>
        <div className="flex flex-col pb-5">
          <label className={`${errorForm && (precio === '' || precio <= 0)? "text-red-500" : "text-teal-500" }`}>Precio</label>
          <input
            placeholder="$"
            type="number"
            min="0"
            name="precio"
            value={precio}
            onChange={e => setPrecio(Number(e.target.value))}
            className={`rounded border shadow p-2 focus:outline-none focus:ring focus:ring-teal-100 transition-all ease-linear duration-150 ${errorForm && (precio === '' || precio<=0) ? "border-red-500 bg-red-100" : "border-gray-200"}`}/>
            {errorForm && (precio === '' || precio<=0) ? <p className="text-center text-red-500">Escribe un precio</p> : null}
        </div>
        <button type="submit" className="w-full p-2 shadow-md rounded bg-teal-500 text-white text-xl hover:bg-teal-400 transition-all duration-150 ease-linear">Agregar <i className="fas fa-plus-square"></i></button>
        <div className="flex justify-center">
          {loading ? <i className="fas fa-spinner animate-spin text-gray-400 text-4xl my-3"></i> : null}
        </div>
      </form>
    </div>
  )

}

export default NuevoProducto
