import types from '../types'

//Mostrar alerta
export function mostrarAlerta(alerta) {
  return (dispatch) => {
    dispatch( crearAlerta(alerta) )
  }
}

const crearAlerta = (alerta) => ({
  type: types.MOSTRAR_ALERTA,
  payload: alerta
})
