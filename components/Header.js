import { useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import UsuarioAutenticado from './Header/UsuarioAutenticado';
import UsuarioInvitado from './Header/UsuarioInvitado';

const Header = () => {
  const {  autenticado } = useContext(authContext);

  return (
    <header className="pb-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <a>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={200}
            className="hover:cursor-pointer"
          />
        </a>
      </Link>

      <div>
        {autenticado ? <UsuarioAutenticado /> : <UsuarioInvitado />}
      </div>
    </header>
  );
};

export default Header;
