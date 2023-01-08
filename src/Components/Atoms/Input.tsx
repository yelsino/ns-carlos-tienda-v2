interface Props {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  title?: string
  type?: string
  name?: string
  readOnly?: boolean,
  style?: string
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  ref?: React.RefObject<HTMLInputElement>
}

const Input = ({ onChange, value, title, type, name, readOnly, style,onKeyUp, ref }: Props) => {
  return (
    <div className="w-full select-none">
      <p className="text-gray-500 ">{title}</p>
      <input
        readOnly={readOnly}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onKeyUp={onKeyUp}
        className={`${style} w-full bg-color_green_2 py-4 px-5 font-poppins text-color_green_7 outline-none`}
        ref={ref}
      />
    </div>
  )
}

export default Input
