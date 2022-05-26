import { useState, useContext } from "react";
import AppContext from "../../context/app/appContext";

const Formulario = () => {

  const [tienePassword, setTienePassword] = useState(false);
  const { agregarPassword, agregarDescargas } = useContext(AppContext);

  return (
    <div className="w-full mt-20">
      <div>
        <label className="text-lg text-gray-800">Eliminar tras:</label>
        <select
          defaultValue={'0'}
          className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 rounded leading-none focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(e) => agregarDescargas(e.target.value)}
        >
          <option value="0" disabled>
            --Seleccione--
          </option>
          <option value="1">1 Descarga</option>
          <option value="5">5 Descargas</option>
          <option value="10">10 Descargas</option>
          <option value="20">20 Descargas</option>
        </select>
      </div>

      <div>
        <label className="text-lg text-gray-800 mr-2">
          Proteger con contraseña
        </label>
        <input type={'checkbox'} onChange={() => setTienePassword(!tienePassword) } />


        {tienePassword && (
          <input
            type={'password'}
            className="appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 rounded leading-none focus:outline-none focus:bg-white focus:border-gray-500"
            onChange={(e) => agregarPassword(e.target.value)}
          />
        )}
      </div>
    </div>
  );
};

export default Formulario;
