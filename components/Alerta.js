import { useContext } from 'react';
import authContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';

const Alerta = () => {
  const { mensaje } = useContext(authContext);
  const { mensaje_archivo } = useContext(AppContext);
  return (
      <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto rounded-md'>
            {mensaje || mensaje_archivo}
      </div>
  )
};

export default Alerta;
