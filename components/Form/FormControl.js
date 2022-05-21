import React from 'react'

const FormControl = ({idControl, tipo, value, onChange}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-black text-sm font-bold mb-2 first-letter:uppercase"
        htmlFor={idControl}
      >
        {idControl}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
        type={tipo}
        placeholder={`${idControl} de usuario`}
        id={idControl}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormControl