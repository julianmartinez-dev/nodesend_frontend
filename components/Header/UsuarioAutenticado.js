
import { useContext } from "react";
import authContext from "../../context/auth/authContext";

const UsuarioAutenticado = () => {

    const { usuario, cerrarSesion } = useContext(authContext);

  return (
    <div className="md:flex items-center">
      <p className="px-6 py-2.5 text-center md:mr-4 bg-red-200 ">Hola {usuario?.nombre}</p>

        <button className='btn-secondary py-2.5' onClick={cerrarSesion}>Cerrar Sesión</button>

    </div>
  );
}

export default UsuarioAutenticado