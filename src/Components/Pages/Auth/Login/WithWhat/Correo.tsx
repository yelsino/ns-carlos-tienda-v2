import { Field } from 'formik'

export const Correo = ({ errors, touched }) => {
  return (
    <>
      {/* correo */}
      <div>
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
          autoComplete="new-password"
          className=" w-full rounded-md bg-color_green_2 p-4 text-color_green_7 outline-none"
          name="password"
          id="password"
          type="password"
          autoFocus={false}
        />
      </div>
    </>
  )
}
