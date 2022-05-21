import FormControl from '../components/Form/FormControl';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import ErrorMsg from '../components/Form/ErrorMsg';
import * as Yup from 'yup'

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('El email es obligatorio').email('El email no es válido'),
      password: Yup.string().required('La contraseña es obligatoria')
    }),
    onSubmit: (values) => {
      console.log('Enviando formulario', values)
    }
  });

  return (
    <Layout>
      <div className="md:w-4/5 xl:w1/3 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Iniciar Sesión
        </h2>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
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
                value={'Iniciar Sesión'}
                className="btn-primary w-full hover:cursor-pointer"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
