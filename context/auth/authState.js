//Acciones que disparan las funciones de reducer
import authContext from './authContext';
import { useReducer } from 'react';
import authReducer from './authReducer';

import {
  REGISTRO_EXITOSO,
  REGISTRO_FALLIDO,
  LIMPIAR_ALERTA,
  USUARIO_AUTENTICADO,
  LOGIN_ERROR,
  LOGIN_EXITOSO,
  LOGOUT
} from '../../types';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({ children }) => {
  //1 - Definir el estado inicial
  const initialState = {
    token: typeof windows !== 'undefined' ?  localStorage.getItem('rnsend_token') : '',
    autenticado: null,
    usuario: null,
    mensaje: null,
  };

  //2- Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  //3- Definir las funciones

  //Registrar nuevos usuarios
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/usuarios', datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: REGISTRO_FALLIDO,
        payload: error.response.data.msg,
      });
    }

    //Limpiar la alerta despues de 3s
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  //Auntenticar usuario
  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post('/api/auth', datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      })
    }

    //Limpiar la alerta despues de 3s
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    },(3000))
  }

  //Retorna el usuario autenticado en base al jwt
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem('rnsend_token');
    if (token) {
      tokenAuth(token);
      try {
        const respuesta = await clienteAxios.get('/api/auth');
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: respuesta.data.usuario,
        });
      } catch (error) {
        dispatch({
          type: LOGIN_ERROR,
          payload: error.response.data.msg,
        });
      }
      //Limpiar la alerta despues de 3s
      setTimeout(() => {
        dispatch({
          type: LIMPIAR_ALERTA,
        });
      }, 3000);
    }

  };

  //Cerrar sesion
  const cerrarSesion = () => {
    dispatch({
      type: LOGOUT,
    })
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        usuarioAutenticado,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
