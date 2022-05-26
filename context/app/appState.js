import { useReducer } from 'react';
import AppReducer from './appReducer';
import AppContext from './appContext';
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
import clienteAxios from '../../config/axios';

const AppState = ({ children }) => {
  const initialState = {
    mensaje_archivo: '',
    nombre_hasheado: '',
    nombre_original: '',
    subiendo_archivo: false,
    descargas: 1,
    password: '',
    autor: null,
    url: '',
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });
    borrarAlerta();
  };

  const borrarAlerta = () => {
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  const subirArchivo = async (formData, nombreArchivo) => {
    try {
      dispatch({
        type: SUBIENDO_ARCHIVO,
      });

      const { data } = await clienteAxios.post('/api/archivos', formData);

      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre_hasheado: data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
  //Crea un enlace una vez que se subió el archivo
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre_hasheado,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };

    try {
        const respuesta = await clienteAxios.post('/api/enlaces', data);
        dispatch({
            type: CREAR_ENLACE_EXITO,
            payload: respuesta.data.url
        })
    } catch (error) {
        console.log(error)
    }
  };

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE,
    })
  }

  const agregarPassword = password => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password
    })
  }

  const agregarDescargas = descargas => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: descargas
    })
  }
  return (
    <AppContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre_hasheado: state.nombre_hasheado,
        nombre_original: state.nombre_original,
        subiendo_archivo: state.subiendo_archivo,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        limpiarState,
        agregarPassword,
        agregarDescargas
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
