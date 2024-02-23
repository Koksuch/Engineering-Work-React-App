import { useState, useEffect } from "react"
import moment from "moment"
import "moment/locale/pl"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"
import ReservationFinalize from "../../views/ReservationFinalize"
import Holidays from "date-holidays"
import axios from "axios"

const ReservationTable = () => {
  const [currentWeek, setCurrentWeek] = useState<any>([])
  const [selectedTimes, setSelectedTimes] = useState<
    {
      date: string
      time: string
      selectedTrack: number
    }[]
  >([])
  const [weeksHistory, setWeeksHistory] = useState([
    moment().startOf("isoWeek"),
  ])
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf("day"))
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [reservations, setReservations] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getDates = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        "http://localhost:4000/api/reservations/dates",
      )
      console.log(response.data)
      setReservations([...response.data])
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDates()
  }, [])

  useEffect(() => {
    const week = []
    for (let i = 0; i < 5; i++) {
      const day = startOfWeek.clone().add(i, "days")
      week.push(day.locale("pl").format("DD.MM ddd"))
    }
    setCurrentWeek(week)
  }, [startOfWeek])

  useEffect(() => {
    if (!isOpen) {
      setSelectedTimes([])
      getDates()
    }
  }, [isOpen])

  const handleCellClick = (dayTime: any, track: any) => {
    const [day, time] = dayTime.split(" ")
    const existingIndex = selectedTimes.findIndex(
      (t) => t.date === day && t.time === time && t.selectedTrack === track,
    )

    if (existingIndex !== -1) {
      setSelectedTimes((prevSelectedTimes) =>
        prevSelectedTimes.filter((_, index) => index !== existingIndex),
      )
    } else {
      if (selectedTimes.length < 3) {
        setSelectedTimes((prevSelectedTimes) => [
          ...prevSelectedTimes,
          { date: day, time: time, selectedTrack: track },
        ])
      }
    }

    console.log(selectedTimes)
  }

  const handlePreviousWeek = () => {
    if (weeksHistory.length > 1) {
      setWeeksHistory((prevHistory) =>
        prevHistory.slice(0, prevHistory.length - 1),
      )
      setStartOfWeek((prevStartOfWeek) =>
        prevStartOfWeek.clone().subtract(5, "days"),
      )
    }
  }

  const handleNextWeek = () => {
    const nextWeek = weeksHistory[weeksHistory.length - 1]
      .clone()
      .add(1, "week")
    const maxDate = moment().startOf("isoWeek").add(6, "weeks") // Maksymalnie miesiąc do przodu
    if (nextWeek.isBefore(maxDate)) {
      setWeeksHistory((prevHistory) => [...prevHistory, nextWeek])
      setStartOfWeek((prevStartOfWeek) =>
        prevStartOfWeek.clone().add(5, "days"),
      )
    }
  }

  const isCellSelectable = (dayTime: any) => {
    const isHourSelectable = dayTime.isAfter(moment().add(1, "hour"))

    const holidays = new Holidays("PL")
    const isHoliday = holidays.isHoliday(dayTime.toDate())

    return isHourSelectable && !isHoliday
  }

  const isAlredyReserved = (dayTime: any, track: any) => {
    const isAlreadyReserved = reservations.some((reservation: any) => {
      return (
        dayTime === reservation.date + " " + reservation.time &&
        track === reservation.selectedTrack
      )
    })
    console.log(isAlreadyReserved)
    return isAlreadyReserved
  }

  return (
    <>
      <div className="relative">
        <div className=" flex flex-wrap justify-around">
          <h2 className="mb-5 w-full whitespace-nowrap text-center text-[1.750rem] font-bold uppercase sm:text-4xl md:hidden">
            {currentWeek[0]} - {currentWeek[currentWeek.length - 1]}
          </h2>
          <button
            className="mb-5 flex w-max items-center rounded-xl border-2 border-transparent bg-blue-600 py-2 pl-4 pr-6 text-lg text-white transition-colors hover:border-cyan-300 hover:text-cyan-300 focus:border-cyan-300 focus:text-cyan-300 focus:outline-none disabled:border-transparent disabled:text-white disabled:opacity-70 sm:text-2xl"
            onClick={handlePreviousWeek}
            disabled={weeksHistory.length === 1}
          >
            <ChevronLeftIcon className="w-10" />
            Poprzedni
          </button>
          <h2 className="hidden text-4xl font-bold uppercase md:block">
            {currentWeek[0]} - {currentWeek[currentWeek.length - 1]}
          </h2>
          <button
            className="mb-5 flex w-max items-center rounded-xl border-2 border-transparent bg-blue-600 py-2 pl-6 pr-4 text-lg text-white transition-colors hover:border-cyan-300 hover:text-cyan-300 focus:border-cyan-300 focus:text-cyan-300 focus:outline-none disabled:border-transparent disabled:text-white disabled:opacity-50 sm:text-2xl"
            onClick={handleNextWeek}
            disabled={startOfWeek
              .clone()
              .add(5, "days")
              .isSameOrAfter(moment().startOf("isoWeek").add(4, "weeks"))}
          >
            Następny
            <ChevronRightIcon className="w-10" />
          </button>
        </div>
        <div className="mb-20 flex justify-center overflow-x-auto whitespace-nowrap rounded-xl shadow-xl sm:mb-10 md:m-10">
          <table className="block w-full border-collapse divide-y-2 divide-gray-400 rounded-3xl sm:ml-0 sm:table">
            <thead className="bg-gray-200">
              <tr>
                <th scope="col" className="px-2 py-3 uppercase">
                  Godzina
                </th>
                {currentWeek.map((day: any) => (
                  <th scope="col" className="px-2 py-3 uppercase" key={day}>
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 16 }, (_, i) => i + 6).map((hour) => (
                <tr key={hour}>
                  <td className="text-center tracking-wider" key={hour}>
                    {hour}:00 - {hour + 1}:00
                  </td>
                  {currentWeek.map((day: any, index: number) => {
                    const cellTime = startOfWeek
                      .clone()
                      .add(index, "days")
                      .set("hour", hour)
                      .format(`YYYY-MM-DD HH:mm-${hour + 1}:mm`)
                    const isSelectable = isCellSelectable(
                      startOfWeek.clone().add(index, "days").set("hour", hour),
                    )
                    return (
                      <>
                        <td
                          key={day}
                          className="border-x-2 border-gray-400 text-center last-of-type:border-r-0"
                        >
                          <div className="grid grid-cols-6" key={day}>
                            {Array.from({ length: 6 }, (_, i) => i + 1).map(
                              (track: number, index) => {
                                const isSelected = selectedTimes.some(
                                  (t) =>
                                    cellTime === t.date + " " + t.time &&
                                    track === t.selectedTrack,
                                )
                                const isReserved = isAlredyReserved(
                                  cellTime,
                                  track,
                                )
                                return (
                                  <div
                                    key={index}
                                    className={`h-max px-1 py-2 text-center ${
                                      isReserved
                                        ? "bg-red-600 text-white"
                                        : isSelected
                                        ? "bg-blue-600 text-cyan-300"
                                        : isSelectable
                                        ? "cursor-pointer hover:bg-blue-300"
                                        : "bg-gray-200"
                                    }`}
                                    onClick={() =>
                                      isSelectable &&
                                      !isReserved &&
                                      handleCellClick(cellTime, track)
                                    }
                                  >
                                    {track}
                                  </div>
                                )
                              },
                            )}
                          </div>
                        </td>
                      </>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="absolute bottom-0 left-0 ml-11 translate-y-full text-sm italic">
          Cyfry odpowiadają numerowi toru sportowego. Można wybrać maksymalnie 3
          tory
        </p>
      </div>
      <div className="flex w-full justify-center md:justify-end md:pb-5 md:pr-10">
        <button
          className="rounded-xl border-2 border-transparent bg-blue-600 py-2 pl-4 pr-6 text-2xl text-white transition-colors hover:border-cyan-300 hover:text-cyan-300 focus:border-cyan-300 focus:text-cyan-300 focus:outline-none disabled:border-transparent disabled:text-white disabled:opacity-70"
          disabled={!selectedTimes[0]}
          onClick={() => setIsOpen(true)}
        >
          Zatwierdź wybór oraz przejdź do kolejnego etapu rezerwacji
        </button>
      </div>
      <ReservationFinalize
        reservetionTracksData={[...selectedTimes]}
        isOpen={isOpen}
        onClose={(val: boolean) => setIsOpen(val)}
      />
    </>
  )
}

export default ReservationTable
