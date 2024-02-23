import { useState } from "react"
import { Bars3Icon } from "@heroicons/react/20/solid"
import NavBar from "../NavBar/NavBar"

const Header = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true)

  return (
    <header
      className={`absolute left-0 right-0 top-0 ${
        isHidden ? "h-14" : "h-auto"
      } bg-blue-600 py-5 text-center text-3xl font-bold text-white sm:static sm:h-auto`}
    >
      <div
        className="absolute left-0 top-0 m-2 w-10 cursor-pointer rounded-lg transition-colors duration-100 hover:text-cyan-300 focus:text-cyan-300 focus:outline-none focus-visible:ring focus-visible:ring-cyan-300 focus-visible:duration-0 sm:hidden"
        tabIndex={1}
        onClick={() => setIsHidden(!isHidden)}
      >
        <Bars3Icon />
      </div>
      <div className={`${isHidden ? "hidden sm:block" : "block sm:block"}`}>
        <NavBar />
      </div>
    </header>
  )
}

export default Header
