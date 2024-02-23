import { useEffect, useState } from "react"
import Input from "./Input"
import ReCAPTCHA from "react-google-recaptcha"
import isEmail from "validator/lib/isEmail"
import isMobilePhone from "validator/lib/isMobilePhone"
import axios from "axios"
import { isError } from "util"

export type InputProps = {
  reservetionTracksData: {
    date: string
    time: string
    selectedTrack: number
  }[]
}

export type reservationDataTypes = {
  name: string
  surname: string
  email: string
  phone: string
}

export type errorsTypes = {
  nameError: string
  surnameError: string
  emailError: string
  phoneError: string
}

const ReservationForm = (props: InputProps) => {
  const [reservationData, setReservationData] = useState<reservationDataTypes>({
    name: "",
    surname: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<errorsTypes>({
    nameError: "",
    surnameError: "",
    emailError: "",
    phoneError: "",
  })
  const [captchaValue, setCaptchaValue] = useState("")
  const [isReservedEnd, setIsReservedEnd] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (!errors.emailError) return
    if (isEmail(reservationData.email)) {
      setErrors((prev: errorsTypes) => ({ ...prev, emailError: "" }))
    }
  }, [reservationData.email, errors.emailError])

  useEffect(() => {
    if (!errors.phoneError) return
    if (isMobilePhone(reservationData.phone, "pl-PL")) {
      setErrors((prev: errorsTypes) => ({ ...prev, phoneError: "" }))
    }
  }, [reservationData.phone, errors.phoneError])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationData((prev: reservationDataTypes) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let isFormValid = true
    if (!isEmail(reservationData.email)) {
      setErrors((prev: errorsTypes) => ({
        ...prev,
        emailError: "Niepoprawny adres email",
      }))
      isFormValid = false
    } else {
      setErrors((prev: errorsTypes) => ({ ...prev, emailError: "" }))
      isFormValid = true
    }
    if (!isMobilePhone(reservationData.phone, "pl-PL")) {
      setErrors((prev: errorsTypes) => ({
        ...prev,
        phoneError: "Niepoprawny numer telefonu",
      }))
      isFormValid = false
    } else {
      setErrors((prev: errorsTypes) => ({ ...prev, phoneError: "" }))
      isFormValid = true
    }

    if (!isFormValid) return

    setIsError(false)

    const data = {
      ...reservationData,
      dates: [...props.reservetionTracksData],
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/reservations/add",
        data,
      )
      console.log(response)
    } catch (error) {
      console.log(error)
      setIsError(true)
      return
    }
    console.log("Dane")
    console.log(data)
    setIsReservedEnd(true)
    setIsError(false)
  }

  return (
    <div>
      <>
        <div className="mb-4 flex justify-center overflow-x-auto whitespace-nowrap rounded-xl text-black shadow-xl">
          <table className="w-full border-collapse divide-y-2 divide-gray-400 rounded-3xl">
            <thead className="bg-gray-200">
              <tr>
                <th>Data</th>
                <th>Godzina</th>
                <th>Tor</th>
              </tr>
            </thead>
            <tbody className="bg-white text-center tracking-wider">
              {props.reservetionTracksData.map((track, index) => (
                <tr key={index}>
                  <td>{track.date}</td>
                  <td>{track.time}</td>
                  <td>{track.selectedTrack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <Input
            title="Podaj Imię: "
            name="name"
            type="text"
            value={reservationData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e)
            }}
            placeholder="Imię"
            errorMessage={errors.nameError}
          />
          <Input
            title="Podaj Nazwisko: "
            name="surname"
            type="text"
            value={reservationData.surname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e)
            }}
            placeholder="Nazwisko"
            errorMessage={errors.surnameError}
          />
          <Input
            title="Podaj Email: "
            name="email"
            type="text"
            value={reservationData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e)
            }}
            placeholder="Email"
            errorMessage={errors.emailError}
          />
          <Input
            title="Podaj Telefon: "
            name="phone"
            type="tel"
            value={reservationData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e)
            }}
            placeholder="Telefon"
            errorMessage={errors.phoneError}
          />
          <div className="place-self-center sm:col-span-2">
            <ReCAPTCHA
              sitekey="6LdD9TgpAAAAANaJsgnYbNwqUuS1s8B-Dl4VSOdS"
              onChange={(value: any) => setCaptchaValue(value)}
            />
          </div>
          {isError && (
            <p className="text-center text-3xl font-bold text-red-600 sm:col-span-2">
              Wystąpił błąd podczas rezerwacji
            </p>
          )}
          {!isReservedEnd ? (
            <button
              type="submit"
              disabled={
                !captchaValue ||
                Object.values(reservationData).some((value) => !value) ||
                Object.values(errors).some((value) => value)
              }
              className="rounded-2xl bg-sky-300 p-2 text-center text-lg font-bold text-blue-700 hover:ring-4 hover:ring-cyan-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-400 disabled:opacity-50 sm:col-span-2"
            >
              Rezerwuj
            </button>
          ) : (
            <p className="text-center text-3xl font-bold text-sky-300 sm:col-span-2">
              Dziękujemy za dokonanie rezerwacji
            </p>
          )}
        </form>
      </>
    </div>
  )
}

export default ReservationForm
