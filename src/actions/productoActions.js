import types from '../types'
import axiosClient from '../config/axios'
import Swal from 'sweetalert2'

export function crearNuevoProductoAction(producto){
  return async (dispatch) => {
    dispatch(agregarProducto())

    try {
      //Insertar en la API
      await axiosClient.post('/productos', producto)
      //Actualizar state
      dispatch( agregarProductoExito(producto) )
      //Alerta
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado'
      })
    } catch (e) {
      console.log(e)
      //Cambiar el state
      dispatch( agregarProductoError(true) )
    }

  }
}

const agregarProducto = () => ({
  type: types.AGREGAR_PRODUCTO
})

const agregarProductoExito = (producto) => ({
  type: types.AGREGAR_PRODUCTO_EXITO,
  payload: producto
})

const agregarProductoError = (estado) => ({
  type: types.AGREGAR_PRODUCTO_ERROR,
  payload: estado
})

export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos())

    try {
      const response = await axiosClient.get('/productos')
      dispatch( descargarProductosExito(response.data) )
    } catch (e) {
      console.log(e)
      dispatch( descargarProductosError() )
    }
  }
}

const descargarProductos = () => ({
  type: types.COMENZAR_DESCARGA_PRODUCTOS,
  payload: true
})

const descargarProductosExito = (productos) => ({
  type: types.DESCARGA_PRODUCTOS_EXITO,
  payload: productos
})

const descargarProductosError = () => ({
  type: types.DESCARGA_PRODUCTOS_ERROR,
  payload: true
})

//Eliminar Producto
export function eliminarProductoAction(id) {
  return async (dispatch) => {
    dispatch( obtenerProductoEliminar(id) )

    try {
      await axiosClient.delete(`/productos/${id}`)
      dispatch( eliminarProductoExito() )
    } catch (e) {
      console.log(e)
    }
  }
}

const obtenerProductoEliminar = (id) => ({
  type: types.OBTENER_PRODUCTO_ELIMINAR,
  payload: id
})

const eliminarProductoExito = () => ({
  type: types.PRODUCTO_ELIMINADO_EXITO
})

//Editar Producto
export function obtenerProductoEditar(producto){
  return async (dispatch) => {
    dispatch( obtenerProductoEditarAction(producto) )
  }
}

const obtenerProductoEditarAction = (producto) => ({
  type: types.OBTENER_PRODUCTO_EDITAR,
  payload: producto
})

//Editar Producto
export function editarProducto(producto) {
  return async (dispatch) => {
    dispatch( editarProductoFinal(producto) )

    try {
      const response = await axiosClient.put(`/productos/${producto.id}`, producto)
      console.log(response)
    } catch (e) {

    }

  }
}

const editarProductoFinal = (producto) => ({
  type: types.COMENZAR_EDICION_PRODUCTO,
  payload: producto
})
