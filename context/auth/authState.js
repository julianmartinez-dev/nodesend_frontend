//Acciones que disparan las funciones de reducer
import authContext from "./authContext";
import { useReducer } from 'react'
import authReducer from "./authReducer";

import { REGISTRO_EXITOSO, REGISTRO_FALLIDO, LIMPIAR_ALERTA} from "../../types";

import clienteAxios from "../../config/axios";

const AuthState = ({children}) => {
    //1 - Definir el estado inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }


    //2- Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState)

    //3- Definir las funciones

    //Registrar nuevos usuarios
    const registrarUsuario = async datos => {
       try {
           const respuesta = await clienteAxios.post('/api/usuarios', datos)
           dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
           })
       } catch (error) {
              dispatch({
                type: REGISTRO_FALLIDO,
                payload: error.response.data.msg,
              });
       }

       //Limpiar la alerta despues de 3s
         setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
         } , 3000);
    }

    //Funcion que se ejecuta cuando el usuario se autentica
    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
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
                usuarioAutenticado
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;