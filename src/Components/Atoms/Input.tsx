interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  title: string
  type?: string
  name?: string
  readOnly?: boolean
}

const Input = ({ onChange, value, title, type, name, readOnly }: Props) => {
  return (
    <div className="w-full">
      <p className="text-gray-500 ">{title}</p>
      <input
        readOnly={readOnly}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full bg-color_green_2 py-4 px-5 font-poppins text-color_green_7 outline-none "
      />
    </div>
  )
}

export default Input
