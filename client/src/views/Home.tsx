import useWebsiteTitle from "../hooks/useWebsiteTitle"

const Home = () => {
  useWebsiteTitle("Strona główna")
  return (
    <p className="mb-1 mt-2 bg-black p-1 text-6xl text-red-600">
      Kiedyś może coś tu będzie
    </p>
  )
}

export default Home
