import types from '../types'

const initialState = {
  alerta: null
}

export default function(state=initialState, action) {
  switch (action.type) {

    case types.MOSTRAR_ALERTA:
      return{
        ...state,
        alerta: action.payload
      }

    default:
      return state
  }
}
