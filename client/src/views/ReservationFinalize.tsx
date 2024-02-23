import { useEffect, useState } from "react"
import ReservationForm from "../components/ReservationForm/ReservationForm"
import { XMarkIcon } from "@heroicons/react/20/solid"

export type reservationTableProps = {
  isOpen: boolean
  onClose: (isOpenVal: boolean) => void
  reservetionTracksData: {
    date: string
    time: string
    selectedTrack: number
  }[]
}

const ReservationTable = (props: reservationTableProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen)

  useEffect(() => {
    setIsOpen(props.isOpen)

    if (props.isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [props.isOpen])

  const handleClick = () => {
    setIsOpen(false)
    props.onClose(false)
  }

  return (
    <>
      {isOpen && (
        <>
          <div
            onClick={handleClick}
            className={`${isOpen ? "sm:fixed" : "hidden"}
        bottom-0 left-0 right-0 top-0 w-full bg-black opacity-50`}
          ></div>
          <div
            className={`${
              isOpen ? "fixed" : "hidden"
            }  translsate-y-1/4 bottom-0 left-0 top-0 block w-full flex-col items-center justify-center overflow-auto rounded-2xl bg-blue-600 p-10 text-white sm:bottom-[initial] sm:right-0 sm:top-1/2 sm:flex sm:-translate-y-1/2 md:mx-auto md:w-3/4 lg:w-1/2`}
          >
            <XMarkIcon
              onClick={handleClick}
              tabIndex={1}
              className="absolute right-0 top-0 m-2 w-10 cursor-pointer rounded-lg transition-colors hover:text-cyan-300 focus:text-cyan-300 focus:outline-none focus-visible:ring focus-visible:ring-cyan-300"
            />
            <h2 className="mb-4 mt-2 text-center text-3xl font-bold text-cyan-300">
              Wypełnij odpowiednio formularz aby dokonać rezerwacji!
            </h2>
            <ReservationForm
              reservetionTracksData={[...props.reservetionTracksData]}
            />
          </div>
        </>
      )}
    </>
  )
}

export default ReservationTable
