interface Props {
  title: string
  link?: boolean
  status?: boolean
}

export const ItemTracking = ({ title, status, link }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="flex w-20 flex-col  items-center justify-center">
        <span className="pb-5 text-sm text-gray-400">{title}</span>
        <div className="relative flex items-center ">
          <span
            className={`block h-5 w-5 rounded-full ${
              status ? 'bg-emerald-400' : 'bg-gray-300'
            }`}
          />
          {link && (
            <span className="absolute block h-1 w-20 translate-x-5 bg-gray-200" />
          )}
        </div>
      </div>
    </div>
  )
}
