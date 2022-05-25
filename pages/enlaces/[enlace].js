import React from 'react';
import clienteAxios from '../../config/axios';

const Archivo = ({ enlace }) => {
  return (
  <>
    <h1 className='text-4xl text-center text-gray-700'>Descarga tu archivo:</h1>
        <div className='flex items-center justify-center mt-10'>
            <a 
                className='btn-primary hover:cursor-pointer'
                href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/archivos/${enlace.archivo}`}
                >Aquí</a>
        </div>
  
  </>);
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
