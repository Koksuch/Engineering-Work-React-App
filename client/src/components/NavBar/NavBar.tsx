import { NavLink } from "react-router-dom"

const navLinkInfo = [
  // {
  //   url: "/",
  //   name: "Home",
  // },
  {
    url: "/aktualnosci",
    name: "Aktualności",
  },
  {
    url: "/rezerwacja",
    name: "Rezerwuj tor",
  },
  {
    url: "/cennik",
    name: "Cennik",
  },
  {
    url: "/kontakt",
    name: "Kontakt",
  },
]

const NavBar = () => {
  return (
    <nav>
      <ul
        className={`flex flex-col flex-wrap justify-center gap-4 sm:flex-row sm:gap-8`}
      >
        {navLinkInfo.map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.url}
              className={({ isActive }) =>
                isActive
                  ? "rounded-lg p-1 text-cyan-300 transition-colors duration-100 hover:text-cyan-300 focus:text-cyan-300 focus:outline-none focus-visible:ring focus-visible:ring-cyan-300 focus-visible:duration-0"
                  : "rounded-lg p-1 text-white transition-colors duration-100 hover:text-cyan-300 focus:text-cyan-300 focus:outline-none focus-visible:ring focus-visible:ring-cyan-300 focus-visible:duration-0"
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
