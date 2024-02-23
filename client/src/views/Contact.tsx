import useWebsiteTitle from "../hooks/useWebsiteTitle"
import ContactBox from "../components/ContactBox/ContactBox"
import { type ContactBoxProps } from "../components/ContactBox/ContactBox"

const contactBoxes: ContactBoxProps[] = [
  {
    title: "dyrekcja",
    tel: "123 456 789",
    email: "dyrektor@plywalnia.pl",
  },
  {
    title: "sekretariat",
    tel: "123 456 789",
    email: "sekretariat@plywalnia.pl",
  },
  {
    title: "księgowość",
    tel: "123 456 789",
    email: "ksiegowosc@plywalnia.pl",
  },
  {
    title: "kadry",
    tel: "123 456 789",
    email: "kadry@plywalnia.pl",
  },
  {
    title: "kasa",
    tel: "123 456 789",
    email: "kasa@plywalnia.pl",
  },
]

const Contact = () => {
  useWebsiteTitle("Kontakt")
  return (
    <div className="m-auto w-full md:w-3/4">
      <h1 className="m-auto py-10 text-5xl font-bold text-cyan-300 sm:p-10 sm:text-7xl">
        Kontakt
      </h1>
      <div className="flex justify-center">
        <div className="w-full overflow-x-auto rounded-2xl px-1 py-10 text-center text-2xl shadow-xl sm:w-96 sm:overflow-auto sm:px-5">
          <h2 className="mb-5 text-3xl font-bold uppercase text-blue-600">
            Kryta Pływalnia w Warszawie
          </h2>
          <p>ul. Długa 1</p>
          <p>00-000 Warszawa</p>
        </div>
      </div>
      <div className="my-5 flex flex-wrap justify-center gap-10 sm:m-5">
        {contactBoxes
          .filter(
            (item) => item.title === "dyrekcja" || item.title === "sekretariat",
          )
          .map((contactBox, index) => (
            <ContactBox
              title={contactBox.title}
              tel={contactBox.tel}
              email={contactBox.email}
              key={index}
            />
          ))}
      </div>
      <div className="my-5 mt-10 flex flex-wrap justify-center gap-10 sm:m-5">
        {contactBoxes
          .filter(
            (item) => item.title !== "dyrekcja" && item.title !== "sekretariat",
          )
          .map((contactBox, index) => (
            <ContactBox
              title={contactBox.title}
              tel={contactBox.tel}
              email={contactBox.email}
              key={index}
            />
          ))}
      </div>
    </div>
  )
}

export default Contact
