export type InputProps = {
  title: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  errorMessage: string
  className: string
}

const Input = (props: InputProps) => {
  return (
    <div className="flex flex-col sm:w-min">
      <label htmlFor={props.name} className="pb-1 pl-2 text-lg">
        {props.title}
      </label>
      <input
        className={`rounded-2xl border-2 p-2 text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300 ${
          props.className
        } ${props.errorMessage ? "border-rose-500" : ""}`}
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e)}
        placeholder={props.placeholder}
      />
      <p className="mt-1 text-center text-lg font-bold tracking-wider text-rose-500">
        {props.errorMessage}
      </p>
    </div>
  )
}

Input.defaultProps = {
  className: "",
  errorMessage: "",
}

export default Input
