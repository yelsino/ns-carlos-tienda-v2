interface Props {
  text: string
  checked: boolean
  icon?: string
  onClick: () => void
}

const Select = ({ text, onClick, checked, icon }: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center justify-between border px-5 py-4"
    >
      <div className="flex gap-x-3">
        <span>{icon}</span>
        <span className="truncate first-letter:uppercase">{text}</span>
      </div>
      <input
        className="accent-violet-500"
        readOnly={true}
        type="radio"
        checked={checked}
      />
    </div>
  )
}

export default Select
