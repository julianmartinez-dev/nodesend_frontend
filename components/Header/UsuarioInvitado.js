import React from 'react'
import Link from 'next/link';

const UsuarioInvitado = () => {
  return (
    <>
      <Link href="/login">
        <a className="btn-primary mr-2">Iniciar Sesión</a>
      </Link>
      <Link href="/crear-cuenta">
        <a className="btn-secondary">Crear cuenta</a>
      </Link>
    </>
  );
}

export default UsuarioInvitado