import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="pb-8 flex flex-col md:flex-row items-center justify-between">
      <Link href='/'>
        <a>
          <Image src="/logo.svg" alt="Logo" width={200} height={200} className='hover:cursor-pointer' />
        </a>
      </Link>

      <div>
        <Link href="/login">
          <a className="btn-primary mr-2">Iniciar Sesión</a>
        </Link>
        <Link href="/crear-cuenta">
          <a className="btn-secondary">Crear cuenta</a>
        </Link>
      </div>
    </header>
  );
}

export default Header