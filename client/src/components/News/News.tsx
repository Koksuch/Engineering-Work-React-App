export type NewsProps = {
  imgLink: string
  title: string
  date: string
  newsLink?: string
}

const News = (props: NewsProps) => {
  return (
    <div className=" w-72 p-5 shadow-xl hover:shadow-2xl">
      <img src={props.imgLink} alt="" className="mx-auto w-full" />
      <p className="text-lg font-medium hover:cursor-pointer hover:underline">
        {props.title}
      </p>
      <div className="mt-5 justify-between sm:flex">
        <p className="p-1 text-gray-600">{props.date}</p>
        <p className="p-1 text-blue-600 hover:cursor-pointer hover:underline">
          więcej{" >>"}
        </p>
      </div>
    </div>
  )
}

export default News
