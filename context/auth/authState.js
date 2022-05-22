//Acciones que disparan las funciones de reducer
import authContext from "./authContext";
import { useReducer } from 'react'
import authReducer from "./authReducer";

import { USUARIO_AUTENTICADO } from "../../types";

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
    const registrarUsuario = datos => {
        console.log(datos)
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