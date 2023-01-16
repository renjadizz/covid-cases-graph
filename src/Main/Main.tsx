import React from "react"
import {useState} from "react"
import { Search } from "../Search/Search"

export type CountryListType = {
    id: number
    country: string
    data: []
}

export const Main = () => {
    const [countryList, setCountryList] = useState<CountryListType[]>([{id: 1, country: "", data: []}])
    return (
        <div>
            <div>
                {countryList.map((el: CountryListType) => <Search key={el.id}
                                                                  id={el.id}
                                                                  country={el.country}
                                                                 />
                )}
            </div>
        </div>
    )
}