import { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import clienteAxios from '../../config/axios';
import AppContext from '../../context/app/appContext';
import authContext from '../../context/auth/authContext';
import Formulario from './Formulario';

const Dropzone = () => {
  const { mostrarAlerta, crearEnlace, subirArchivo, subiendo_archivo } =
    useContext(AppContext);

  const { autenticado } = useContext(authContext)

  const onDropRejected = () => {
    mostrarAlerta(
      'ERROR: El limite para cuentas gratuitas es de 1MB por archivo'
    );
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('archivo', acceptedFiles[0]);
    subirArchivo(formData, acceptedFiles[0].path);
  }, []);

  //Extraer contenido de dropzone
  const { getInputProps, getRootProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: autenticado ? 20000000 : 1000000 });

  //Mostrar archivos cargados
  const archivos = acceptedFiles.map((file) => (
    <li
      key={file.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-lg"> {file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));



  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 ">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul className="">{archivos}</ul>

          {
            autenticado && <Formulario />
          }

          {subiendo_archivo ? (
            <p className='my-10 text-center text-gray-600'>Subiendo archivo...</p>
          ) : (
            <button
              type="button"
              className="btn-secondary w-full mt-20"
              onClick={crearEnlace}
            >
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div
          {...getRootProps({
            className: 'dropzone w-full py-32',
          })}
        >
          <input className="h-100" {...getInputProps()} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">Suelta aquí</p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Selecciona un archivo y arrastralo aquí
              </p>
              <button className="btn-secondary mt-5" type="button">
                Selecciona archivos para subir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
