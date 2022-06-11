import { useContext } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import flag from '../../../../Assets/peru.png';
import bird from '../../../../Assets/bird.svg';
import plants from '../../../../Assets/plants.svg';
import woman from '../../../../Assets/woman.svg';
import heart from '../../../../Assets/heart.gif';
import { motion } from 'framer-motion';
import SwitchLogin from './SwitchLogin';
import { AuthContext } from '../../../../Context/auth/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  // const navigate = useNavigate();

  const validar = Yup.object().shape({
    email: Yup.string().email('formato invalido').required('es requerido'),
    password: Yup.string().required('es requerido'),
  });

  return (
    <div className=' h-screen flex justify-center items-center  relative'>
      {/* ADITIONALS */}

      <motion.img
        className='absolute top-10 right-10 w-20'
        key={bird}
        src={bird}
        initial={{ y: -300, opacity: 0, rotate: -20 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      />
      <div className='max-w-5xl  flex justify-center items-center '>
        <div className='w-full md:w-1/2 p-10 flex flex-col items-center gap-5 font-poppins'>
          <p className='text-left w-72 sm:w-80'>Iniciar sesion con</p>

          <SwitchLogin />
          <Formik
            initialValues={{
              email: 'yelsin@gmail.com',
              password: 'Ilovelife@321',
            }}
            validationSchema={validar}
            onSubmit={async values => {
              await login(values.email, values.password);
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete='off' className=''>
                <div className=' w-72 sm:w-80 relative gap-y-7 flex flex-col'>
                  {/* email */}
                  <div>
                    <div className='flex gap-x-1 '>
                      <label htmlFor='password' className='text-gray-500'>
                        Numero de teléfono
                      </label>
                      {errors.email && touched.email ? (
                        <div className='text-rose-400'>{errors.email}</div>
                      ) : null}
                    </div>
                    <div className='flex gap-x-10 '>
                      <div className='flex gap-x-1 items-center'>
                        <img src={flag} className='w-10 h-10' />
                        <p className='text-gray-400'>+51</p>
                      </div>
                      <Field
                        autoComplete={'off'}
                        className=' rounded-md p-4 outline-none bg-color_green_2 w-full text-color_green_7'
                        name='email'
                        id='email'
                      />
                    </div>
                  </div>

                  {/* password */}

                  <div>
                    <div className='flex gap-x-1'>
                      <label htmlFor='password' className='text-gray-500'>
                        Password
                      </label>
                      {errors.password && touched.password ? (
                        <div className='text-rose-400'>{errors.password}</div>
                      ) : null}
                    </div>

                    <Field
                      autoComplete='new-password'
                      className=' rounded-md p-4 outline-none text-color_green_7 bg-color_green_2 w-full'
                      name='password'
                      id='password'
                      type='password'
                    />
                  </div>

                  {/* button */}
                  <button className='bg-color_green_7 text-white font-semibold text-lg py-3 rounded-sm'>
                    INICIAR
                  </button>

                  <div className='flex gap-x-7 justify-between text-blue-600'>
                    <button className='bg-cyan-100/30 w-1/2 py-2 flex justify-center items-center gap-x-2'>
                      <img src='https://img.icons8.com/color/24/000000/google-logo.png' />
                      Google
                    </button>
                    <button className='bg-cyan-100/30 w-1/2 py-2 flex justify-center items-center gap-x-2'>
                      <img src='https://img.icons8.com/color/24/000000/facebook-new.png' />
                      Facebook
                    </button>
                  </div>

                  <button
                    to='/auth/restore'
                    className='text-center text-color_green_4 cursor-pointer'
                  >
                    <p className='text-center text-gray-500 cursor-pointer mb-3'>
                      Olvidé mis credenciales
                    </p>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className='hidden md:w-1/2 md:flex p-10 '>
          <div className='w-10/12 flex justify-center'>
            <div className='w-8/12'>
              <img src={woman} />
              <img src={plants} />
              <h2 className='text-center font-bold pt-7 text-2xl flex w-full justify-center '>
                Pase casero
                <img className='w-8' src={heart} />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
