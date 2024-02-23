import useWebsiteTitle from "../hooks/useWebsiteTitle"

const NotFound = () => {
  useWebsiteTitle("Strony nie odnaleziono")
  return (
    <div className="text-sky-600">
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  )
}

export default NotFound
