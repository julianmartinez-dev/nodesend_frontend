import { useContext } from 'react';
import authContext from '../context/auth/authContext';

const Alerta = () => {
  const { mensaje } = useContext(authContext);
  return (
      <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto rounded-md'>
            {mensaje}
      </div>
  )
};

export default Alerta;
