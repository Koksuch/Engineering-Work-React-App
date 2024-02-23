import useWebsiteTitle from "../hooks/useWebsiteTitle"

const Prices = () => {
  useWebsiteTitle("Cennik")

  type pricesType = {
    type: string
    name: string
    normalPrice?: string
    weekendPrice?: string
    price?: string
  }

  const prices: pricesType[] = [
    {
      type: "solo",
      name: "Bilet normalny 1 godz.",
      normalPrice: "13,00zł",
      weekendPrice: "15,00zł",
    },
    {
      type: "solo",
      name: "Bilet normalny 2 godz.",
      normalPrice: "18,00zł",
      weekendPrice: "22,00zł",
    },
    {
      type: "solo",
      name: "Bilet normalny 3 godz.",
      normalPrice: "23,00zł",
      weekendPrice: "25,00zł",
    },
    {
      type: "solo",
      name: "Bilet ulgowy 1 godz.",
      normalPrice: "10,00zł",
      weekendPrice: "12,00zł",
    },
    {
      type: "solo",
      name: "Bilet ulgowy 2 godz.",
      normalPrice: "14,00zł",
      weekendPrice: "17,00zł",
    },
    {
      type: "solo",
      name: "Bilet ulgowy 3 godz.",
      normalPrice: "18,00zł",
      weekendPrice: "20,00zł",
    },
    {
      type: "group",
      name: "Bilet rodzinny - 1 osoba dorosła + 1 dziecko do lat 18",
      price: "20,00zł",
    },
    {
      type: "group",
      name: "Bilet rodzinny - 2 osoby dorosłe + 1 dziecko do lat 18",
      price: "30,00zł",
    },
    {
      type: "group",
      name: "Każde kolejne dziecko",
      price: "7,00zł",
    },
    {
      type: "group",
      name: "Bilet grupowy normalny (min. 15 osób) - za osobę",
      price: "12,00zł",
    },
    {
      type: "group",
      name: "Bilet grupowy ulgowy (min. 15 osób) - za osobę",
      price: "9,00zł",
    },
  ]

  return (
    <div className="m-auto w-full xl:w-3/4">
      <h1 className="m-auto py-10 text-5xl font-bold text-cyan-300 sm:p-10 sm:text-7xl">
        Cennik
      </h1>
      <div className="mb-10 flex justify-center overflow-auto rounded-xl shadow-xl sm:m-10">
        <table className="w-full border-collapse divide-y-2 divide-gray-400 rounded-3xl">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col" className="px-2 py-3 uppercase">
                Bilet indywidualny
              </th>
              <th scope="col" className="px-2 py-3 uppercase">
                PN - Pt
              </th>
              <th scope="col" className="px-2 py-3 uppercase">
                SB - NDZ
              </th>
            </tr>
          </thead>
          <tbody>
            {prices
              .filter((price) => price.type === "solo")
              .map((price) => (
                <tr key={price.name}>
                  <td className="border-b-2 border-gray-400 text-center tracking-wider sm:border-b-0">
                    {price.name}
                  </td>
                  <td className="border-x-2 border-b-2 border-gray-400 text-center last-of-type:border-r-0 sm:border-b-0">
                    {price.normalPrice}
                  </td>
                  <td className="border-x-2 border-b-2 border-gray-400 text-center last-of-type:border-r-0 sm:border-b-0">
                    {price.weekendPrice}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center overflow-auto rounded-xl shadow-xl sm:m-10">
        <table className="w-full border-collapse divide-y-2 divide-gray-400 rounded-3xl">
          <thead className="bg-gray-200">
            <tr>
              <th scope="col" className="px-2 py-3 uppercase">
                Bilet rodzinny i grupowy
              </th>
              <th scope="col" className="px-2 py-3 uppercase">
                PN - NDZ
              </th>
            </tr>
          </thead>
          <tbody>
            {prices
              .filter((price) => price.type === "group")
              .map((price) => (
                <tr key={price.name}>
                  <td
                    className={`border-b-2 border-gray-400 text-center tracking-wider sm:border-0 ${
                      price.name === "Każde kolejne dziecko"
                        ? "border-b-2 border-gray-400 font-bold"
                        : ""
                    }`}
                  >
                    {price.name}
                  </td>
                  <td
                    className={`border-x-2 border-b-2 border-gray-400 text-center last-of-type:border-r-0 sm:border-b-0 ${
                      price.name === "Każde kolejne dziecko"
                        ? "border-b-2 border-solid border-gray-400"
                        : ""
                    }`}
                  >
                    {price.price}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Prices
