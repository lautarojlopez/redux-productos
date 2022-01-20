import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
//Redux
import {useDispatch} from 'react-redux'
import {eliminarProductoAction, obtenerProductoEditar} from '../actions/productoActions'

const Producto = (producto) => {

  const {nombre, precio, id} = producto.producto
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //Eliminar producto
  const confirmarEliminarProducto = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Este proceso es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch( eliminarProductoAction(id) )
        Swal.fire(
          'Eliminado',
          '',
          'success'
        )
      }
    })
  }

  //Redireccionar a edición
  const redireccionarEdicion = (producto) => {
    dispatch( obtenerProductoEditar(producto) )
    navigate(`/productos/editar/${producto.id}`)
  }

  return(
    <tr className="whitespace-nowrap">
        <td className="px-6 py-4 text-sm text-gray-500">
            {nombre}
        </td>
        <td className="px-6 py-4">
            <div className="text-sm text-green-600">
                ${precio}
            </div>
        </td>
        <td className="px-6 py-4 text-center">
            <button onClick={() => redireccionarEdicion(producto.producto)}>
              <i className="fas fa-edit text-cyan-600 text-center"></i>
            </button>
        </td>
        <td className="px-6 py-4 text-center">
            <button onClick={() => confirmarEliminarProducto(id)}>
                <i className="fa fa-trash text-red-500"></i>
            </button>
        </td>
    </tr>
  )

}

export default Producto
