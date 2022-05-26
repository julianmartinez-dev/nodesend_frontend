import {
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
  SUBIR_ARCHIVO_ERROR,
  SUBIR_ARCHIVO_EXITO,
  SUBIENDO_ARCHIVO,
  CREAR_ENLACE_ERROR,
  CREAR_ENLACE_EXITO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case MOSTRAR_ALERTA:
      return {
        ...state,
        mensaje_archivo: action.payload,
      };
    case LIMPIAR_ALERTA:
        return {
            ...state,
            mensaje_archivo: '',
        }
    case SUBIENDO_ARCHIVO:
        return {
            ...state,
            subiendo_archivo: true,
        }
    case SUBIR_ARCHIVO_EXITO:
        return {
            ...state,
            nombre_hasheado: action.payload.nombre_hasheado,
            nombre_original: action.payload.nombre_original,
            subiendo_archivo: false,
        }
    case SUBIR_ARCHIVO_ERROR:
        return {
            ...state,
            mensaje_archivo: action.payload,
            subiendo_archivo: false,
        }
    case CREAR_ENLACE_EXITO:
        return {
            ...state,
            url : action.payload   
        }
    case AGREGAR_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case AGREGAR_DESCARGAS:
      return {
        ...state,
        descargas: action.payload
      }
    case LIMPIAR_STATE:
        return {
          ...state,
          mensaje_archivo: '',
          nombre_hasheado: '',
          nombre_original: '',
          subiendo_archivo: false,
          descargas: 1,
          password: '',
          autor: null,
          url: '',
        };

    default:
      return state;
  }
};
