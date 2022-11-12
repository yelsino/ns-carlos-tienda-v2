import { Field } from 'formik'
import flag from '../../../../../Assets/peru.png'

export const Mobile = ({ errors, touched }) => {
  return (
    <>
      {/* email */}
      <div>
        <div className="flex gap-x-1 ">
          <label htmlFor="password" className="text-gray-500">
            Numero de teléfono
          </label>
          {errors.email && touched.email ? (
            <div className="text-rose-400">{errors.email}</div>
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
            className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none"
            name="email"
            id="email"
          />
        </div>
      </div>

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
          // autoFocus={false}
          className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none"
          name="password"
          id="password"
          type="password"
        />
      </div>
    </>
  )
}
