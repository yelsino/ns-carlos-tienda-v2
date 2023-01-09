import { Field, FormikProps } from 'formik'
import { motion } from 'framer-motion'
import { QueHacer } from 'interfaces/interfaces'
import flag from 'public/Assets/peru.png'
import { IMobile } from 'types-yola'

interface Props extends FormikProps<IMobile> {
  quehacer: QueHacer
}

export const Mobile = (props:Props) => {

  const { errors, touched, isSubmitting, quehacer } = props;

  return (
    <>
      {/* email */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      	<div className="flex gap-x-1 ">
          <label htmlFor="password" className="text-gray-500">
            Numero de teléfono
          </label>
          {errors.celular && touched.celular ? (
            <div className="text-rose-400">{errors.celular}</div>
          ) : null}
        </div>
        <div className="flex gap-x-10 ">
          <div className="flex items-center gap-x-1">
            <img src={flag} className="h-10 w-10" />
            <p className="text-gray-400">+51</p>
          </div>
          <Field
            type="number"
            autoComplete="off"
            autoFocus={false}
            className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none appearance-none"
            name="celular"
            id="celular"
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
          autoComplete=""
          className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none "
          name="password"
          id="password"
          type="password"
        />
      </div>

      <button
          disabled={isSubmitting}
          type="submit"
          className="rounded-sm bg-color_green_7 py-3 text-lg font-semibold text-white"
        >
           {
           quehacer === "INICIAR_SESION" 
           ? isSubmitting ? 'INICIANDO...' : 'INICIAR' 
           : isSubmitting ? 'REGISTRANDOSE...' : 'REGISTRARSE' }
        </button>
    </>
  )
}
