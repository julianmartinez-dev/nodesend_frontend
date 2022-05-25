import { useContext, useEffect, useState } from "react"
import Link from "next/link";
import authContext from '../context/auth/authContext'
import Dropzone from "../components/Dropzone/Dropzone";
import AppContext from "../context/app/appContext";
import Alerta from "../components/Alerta";

export default function Home() {

  const { usuarioAutenticado } = useContext(authContext);
  const { mensaje_archivo, url } = useContext(AppContext)

  const [copiado, setCopiado] = useState(false)

  useEffect(() => {
    usuarioAutenticado();
  },[])
  
  const handleCopiar = (url) => {
    navigator.clipboard.writeText(url);
    setCopiado(true)
  }
  

  return (
    <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
      {url ? (
        <>
          <p className="text-center md:text-2xl mt-10">
            <span className="font-bold text-red-700 md:text-3xl uppercase">Tu URL es: </span>{`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`}
          </p>
          <button
            type="button"
            className="btn-primary w-full mt-5"
            onClick={() => handleCopiar(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/enlaces/${url}`)}
          >
            {copiado ? 'Copiado' : 'Copiar Enlace'}
          </button>
        </>
      ) : (
        <>
          {mensaje_archivo && <Alerta />}
          <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
            <Dropzone />
            <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
              <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                Compartir archivos de forma sensilla y privada
              </h2>
              <p className="text-lg leading-loose">
                <span className="text-red-500 font-bold">ReactNodeSend </span>
                te permite compartir archivos con cifrado de extremo a extremo y
                un archivo que es eliminado despues de ser descargado. Asi que
                puedes mantener lo que compartes en privado y asegurarte de que
                tus cosas no permanezcan en linea para siempre.
              </p>
              <Link href="/crear-cuenta">
                <a className="font-bold text-red-500 text-lg hover:text-red-600">
                  <span className="underline decoration-wavy">
                    Crea tu cuenta
                  </span>{' '}
                  para mayores beneficios
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
