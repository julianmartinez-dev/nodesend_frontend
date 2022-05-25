import { useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import authContext from '../context/auth/authContext';
import AppContext from '../context/app/appContext';
import UsuarioAutenticado from './Header/UsuarioAutenticado';
import UsuarioInvitado from './Header/UsuarioInvitado';

const Header = () => {
  const {  autenticado } = useContext(authContext);
  const { limpiarState } = useContext(AppContext);

  const router = useRouter();

  const redirectToHome = () => {
    router.push('/');
    limpiarState()
  }
  return (
    <header className="pb-8 flex flex-col md:flex-row items-center justify-between">
      
        
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={200}
            className="hover:cursor-pointer"
            onClick={redirectToHome}
          />
        
      

      <div>
        {autenticado ? <UsuarioAutenticado /> : <UsuarioInvitado />}
      </div>
    </header>
  );
};

export default Header;
