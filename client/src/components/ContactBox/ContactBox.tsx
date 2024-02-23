export type ContactBoxProps = {
  title: string
  tel: string
  email: string
  key?: number
}

const ContactBox = (props: ContactBoxProps) => {
  return (
    <div
      key={props.key}
      className="w-full overflow-x-scroll rounded-2xl px-5 py-10 text-2xl shadow-xl sm:w-96 sm:overflow-auto"
    >
      <h2 className="mb-5 text-center text-3xl font-bold uppercase text-blue-600">
        {props.title}
      </h2>
      <div>
        <p>tel. {props.tel}</p>
        <p>
          email:{" "}
          <a
            className="underline transition-colors hover:text-cyan-300"
            href={`mailto:${props.email}`}
          >
            {props.email}
          </a>
        </p>
      </div>
    </div>
  )
}

export default ContactBox
