import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clienteAxios from '../../config/axios';

const Dropzone = () => {
  const onDropRejected = () => {
    console.log('No se pudo subir');
  };

  //Evento cuando caen los archivos en el dropzone y son aceptados
  const onDropAccepted = useCallback(async (acceptedFiles) => {
    //Crear el formData
    const formData = new FormData();
    formData.append('archivo', acceptedFiles[0]);

    const { data } = await clienteAxios.post('/api/archivos', formData);
    console.log(data);
  }, []);

  //Extraer contenido de dropzone
  const { getInputProps, getRootProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

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

  const crearEnlace = () => {
    console.log('Creando enlance...');
  };

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 ">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul className="">{archivos}</ul>

          <button
            type="button"
            className="btn-secondary w-full"
            onClick={crearEnlace}
          >
            Crear Enlace
          </button>
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
              <button className="btn-primary mt-5" type="button">
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
