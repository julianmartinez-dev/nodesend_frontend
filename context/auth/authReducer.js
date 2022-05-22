import {
  REGISTRO_FALLIDO,
  REGISTRO_EXITOSO,
  LIMPIAR_ALERTA
} from '../../types'


//Funciones que se encargan de alterar el state
export default (state, action) =>{
    switch (action.type) {
      case REGISTRO_EXITOSO:
      case REGISTRO_FALLIDO:
        return {
          ...state,
          mensaje: action.payload,
        };
      case LIMPIAR_ALERTA:
        return {
          ...state,
          mensaje: null,
        }
      // case 'LOGOUT':
      //     return {
      //         ...state,
      //         isAuthenticated: false,
      //         user: null
      //     }
      default:
        return state;
    }
}