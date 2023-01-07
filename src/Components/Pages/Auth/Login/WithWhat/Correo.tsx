import { Field, FormikProps } from 'formik'
import { motion } from 'framer-motion'
import { IAuth } from 'types-yola';

interface Props extends FormikProps<IAuth> {
  loading: boolean
}

export const Correo = (props:Props) => {

    const { errors, touched, isSubmitting, submitForm, loading } = props;

    return (
      <>
        {/* correo */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex gap-x-1 ">
            <label htmlFor="password" className="text-gray-500">
              Correo
            </label>
            {errors.correo && touched.correo ? (
              <div className="text-rose-400">{errors.correo}</div>
            ) : null}
          </div>
          <div className="flex gap-x-10 ">
            <Field
              autoComplete="off"
              className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none"
              name="correo"
              id="correo"
            />
          </div>
        </motion.div>
  
        {/* password */}
  
        <div>
          <div className="flex gap-x-1">
            <label htmlFor="password" className="text-gray-500">
              Contraseña
            </label>
            {errors.password && touched.password ? (
              <div className="text-rose-400">{errors.password}</div>
            ) : null}
          </div>
  
          <Field
            autoComplete="new-password"
            className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none"
            name="password"
            id="password"
            type="password"
            autoFocus={false}
          />
        </div>

        <button
        disabled={isSubmitting}
        type="submit"
        className="rounded-sm bg-color_green_7 py-3 text-lg font-semibold text-white"
      >
        {loading ? 'INICIANDO...' : 'INICIAR'}
      </button>
      </>
    )
}
