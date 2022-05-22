import { useContext, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import FormControl from '../components/Form/FormControl';
import ErrorMsg from '../components/Form/ErrorMsg';
import Alerta from '../components/Alerta';

const CrearCuenta = () => {

  const {mensaje, registrarUsuario } = useContext(authContext);

  //Formulario y validacion con Formik y Yup
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string().required('El email es obligatorio').email('El email no es válido'),
      password: Yup.string().required('La contraseña es obligatoria').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    }),

    onSubmit: (values) => {
      registrarUsuario(values);
    }
  });

  return (

      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Crear Cuenta
        </h2>
        {mensaje && <Alerta />}
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <FormControl
                idControl="nombre"
                tipo="text"
                value={formik.values.nombre}
                onChange={formik.handleChange}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <ErrorMsg error={formik.errors.nombre} />
              )}
              <FormControl
                idControl="email"
                tipo="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <ErrorMsg error={formik.errors.email} />
              )}
              <FormControl
                idControl="password"
                tipo="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.touched.password && formik.errors.password && (
                <ErrorMsg error={formik.errors.password} />
              )}
              <input
                type={'submit'}
                value={'Crear Cuenta'}
                className="btn-primary w-full hover:cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>

  );
};

export default CrearCuenta;
