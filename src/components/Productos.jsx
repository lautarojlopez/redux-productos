import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions'
import Producto from './Producto'

const Productos = () => {

  const dispatch = useDispatch()

  //Obtener state del store de Redux
  const productos = useSelector((state) => {
    return state.productos.productos
  })
  const error = useSelector((state) => {
    return state.productos.error
  })
  const loading = useSelector((state) => {
    return state.productos.loading
  })

  useEffect(() => {
    const cargarProductos = () => {
      dispatch( obtenerProductosAction() )
    }
    cargarProductos()
  }, [])

  return(
    <div className="">
      <h1>Listado de Productos</h1>
      {error ? <p className="text-red-500 font-bold text-center text-xl mt-3 bg-red-100 p-3 w-auto">Ha ocurrido un error al cargar los productos</p> : null}
      <div className="flex justify-center">
        {loading ? <i className="fas fa-spinner animate-spin text-gray-400 text-4xl my-3"></i> : null}
      </div>
      <div className="flex mt-5 justify-center mx-auto">
          <div className="flex flex-col">
              <div className="w-full">
                  <div className="border-b border-gray-200 shadow">
                      <table className="divide-y divide-gray-300 ">
                          <thead className="bg-teal-600">
                              <tr>
                                  <th className="px-6 py-2 text-white">
                                      Nombre
                                  </th>
                                  <th className="px-6 py-2 text-white">
                                      Precio
                                  </th>
                                  <th className="px-6 py-2 text-white">
                                      Editar
                                  </th>
                                  <th className="px-6 py-2 text-white">
                                      Borrar
                                  </th>
                              </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-300">
                            {productos.length === 0 ? null
                            : (
                              productos.map((producto) => (
                                <Producto
                                  key={producto.id}
                                  producto={producto}
                                />
                              ))
                            )}
                          </tbody>
                      </table>
                      {productos.length === 0 ? <p className="text-center">No hay productos</p> : null }
                  </div>
              </div>
          </div>
      </div>
    </div>
  )

}

export default Productos
