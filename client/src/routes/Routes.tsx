import { Outlet, Route, Routes } from "react-router-dom"
import Home from "../views/Home"
import NotFound from "../views/NotFound"
import TrackReservation from "../views/TrackReservation"
import Prices from "../views/Prices"
import Contact from "../views/Contact"
import Newses from "../views/Newses"

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aktualnosci" element={<Newses />} />
      <Route path="/rezerwacja" element={<TrackReservation />} />
      <Route path="/cennik" element={<Prices />} />
      <Route path="/kontakt" element={<Contact />} />

      <Route
        path="/profile"
        element={
          <div className="bg-red-400">
            <h1>Profile</h1> <Outlet />
          </div>
        }
      >
        <Route index element={<h1>Account</h1>} />
        <Route path="settings" element={<h1>Settings</h1>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Content
