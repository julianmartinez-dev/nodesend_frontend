//Funciones que se encargan de alterar el state
export default (state, action) =>{
    switch (action.type) {
      case 'USUARIO_AUTENTICADO':
        return {
          ...state,
          autenticado: true,
          usuario: action.payload,
        };
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