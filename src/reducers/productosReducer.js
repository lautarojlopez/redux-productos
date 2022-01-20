import types from '../types'

const initialState = {
  productos: [],
  error: null,
  loading: false,
  eliminarproducto: null,
  productoeditar: null
}

export default function(state=initialState, action) {
  switch (action.type) {

    case types.AGREGAR_PRODUCTO:
      return{
        ...state,
        loading: true,
      }

    case types.AGREGAR_PRODUCTO_EXITO:
      return{
        ...state,
        loading: false,
        productos: [...state.productos, action.payload]
      }

    case types.AGREGAR_PRODUCTO_ERROR:
      return{
        ...state,
        loading: false,
        error: action.payload
      }

    case types.COMENZAR_DESCARGA_PRODUCTOS:
      return{
        ...state,
        loading: action.payload
      }

    case types.DESCARGA_PRODUCTOS_EXITO:
      return{
        ...state,
        loading: false,
        error: null,
        productos: action.payload
      }

    case types.DESCARGA_PRODUCTOS_ERROR:
      return{
        ...state,
        loading: false,
        error: action.payload
      }

    case types.OBTENER_PRODUCTO_ELIMINAR:
      return{
        ...state,
        eliminarproducto: action.payload
      }

    case types.PRODUCTO_ELIMINADO_EXITO:
      return{
        ...state,
        productos: state.productos.filter((producto) => producto.id !== state.eliminarproducto),
        eliminarproducto: null
      }

    case types.PRODUCTO_ELIMINADO_ERROR:
      return{
        ...state,
        error: true
      }

    case types.OBTENER_PRODUCTO_EDITAR:
      return{
        ...state,
        productoeditar: action.payload
      }

    default:
      return state

  }
}
