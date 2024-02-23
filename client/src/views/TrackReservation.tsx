import ReservationTable from "../components/ReservationTable/ReservationTable"
import useWebsiteTitle from "../hooks/useWebsiteTitle"

const TrackReservation = () => {
  useWebsiteTitle("Rezerwacja toru")
  return (
    <div>
      <h1 className="m-auto py-10 text-5xl font-bold text-cyan-300 sm:p-10 sm:text-7xl">
        Rezerwacja toru
      </h1>
      <ReservationTable />
    </div>
  )
}

export default TrackReservation
