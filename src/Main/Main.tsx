import {useState} from "react"

export type CountryListType = {
    id: number
    country: string
    data: []
}

export const Main = () => {
    const [countryList, setCountryList] = useState<CountryListType[]>([{id: 1, country: "", data: []}])

}