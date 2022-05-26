import { useState, useContext } from 'react';
import clienteAxios from '../../config/axios';
import AppContext from '../../context/app/appContext';
import Alerta from '../../components/Alerta'
import { useRouter } from 'next/router';

const Archivo = ({ enlace }) => {

  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState('');
  const { mensaje_archivo, mostrarAlerta } = useContext(AppContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        password,
      };
      const resultado = await clienteAxios.post(
        `/api/enlaces/${enlace.enlace}`,
        data
      );
      setTienePassword(resultado.data.password);
    } catch (error) {
      
      mostrarAlerta(error.response.data.msg);
    }
  };

  const handleDownload = () => {
    router.push('/')
  }

  return (
    <>
      {tienePassword ? (
        <div className="flex flex-col items-center">
          <p className="text-center">
            El enlace requerido está protegido por password, colóquelo y acceda
            a la descarga.
          </p>

          {
            mensaje_archivo && <Alerta />
          }

          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4 container max-w-md mt-10"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2 first-letter:uppercase"
                htmlFor="password"
              >
                password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Acceder"
              className="btn-primary w-full hover:cursor-pointer"
            />
          </form>
        </div>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              className="btn-primary hover:cursor-pointer"
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/archivos/${enlace.archivo}`}
              onClick={handleDownload}
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default Archivo;

export async function getStaticProps({ params }) {
  const { enlace } = params;
  const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
  return {
    props: {
      enlace: resultado.data,
    },
  };
}

export async function getStaticPaths() {
  const enlaces = await clienteAxios.get('/api/enlaces');
  const paths = enlaces.data.enlaces.map((enlace) => ({
    params: {
      enlace: enlace.url,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
