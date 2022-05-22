import {
  REGISTRO_FALLIDO,
  REGISTRO_EXITOSO,
  LIMPIAR_ALERTA,
  USUARIO_AUTENTICADO,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
} from '../../types';

//Funciones que se encargan de alterar el state
export default (state, action) => {
  switch (action.type) {
    case REGISTRO_EXITOSO:
    case REGISTRO_FALLIDO:
    case LOGIN_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case LIMPIAR_ALERTA:
      return {
        ...state,
        mensaje: null,
      };
    case LOGIN_EXITOSO:
      localStorage.setItem('rnsend_token', action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      }
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
      }
    default:
      return state;
  }
};
