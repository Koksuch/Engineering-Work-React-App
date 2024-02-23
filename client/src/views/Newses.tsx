import News from "../components/News/News"
import noImg from "../assets/no-img-icon.png"
import { type NewsProps } from "../components/News/News"
import useWebsiteTitle from "../hooks/useWebsiteTitle"

const newses: NewsProps[] = [
  {
    imgLink: noImg,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "12.12.2023",
  },
  {
    imgLink: noImg,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "12.12.2023",
  },
  {
    imgLink: noImg,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "12.12.2023",
  },
  {
    imgLink: noImg,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "12.12.2023",
  },
  {
    imgLink: noImg,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    date: "12.12.2023",
  },
]
const Newses = () => {
  useWebsiteTitle("Aktualności")
  return (
    <div className="m-auto w-full md:w-3/4">
      <h1 className="m-auto py-10 text-5xl font-bold text-cyan-300 sm:text-7xl">
        Aktualności
      </h1>
      <div className="flex flex-wrap justify-around gap-5">
        {newses.map((news, index) => (
          <News
            imgLink={news.imgLink}
            title={news.title}
            date={news.date}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

export default Newses
