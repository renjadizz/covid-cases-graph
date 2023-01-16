import React from "react"
import {useState} from "react"
import { Search } from "../Search/Search"
import {CovidApi} from "../API/API";

export type CountryListType = {
    id: number
    country: string
    data: []
}

export const Main = () => {
    const [countryList, setCountryList] = useState<CountryListType[]>([{id: 1, country: "", data: []}])
    const callBackFind = (id: number, value: string) => {
        let newValues = [...countryList]
        if (newValues.length !== 0) {
            newValues.forEach((el, i) => {
                    if (el.id === id) {
                        newValues[i].country = value
                        CovidApi.getCountryData(value).then(data => {
                            newValues[i].data = data.response
                        }).then(() => {
                            setCountryList(newValues)
                        })
                    }
                }
            )
        }
    }
    const callBackRemoveSearchField = (id: number) => {
            let newValues = [...countryList]
            const countryIndex = newValues.map(e => e.id).indexOf(id)
            newValues.splice(countryIndex, 1)
            setCountryList(newValues)
    }

    return (
        <div>
            <div>
                {countryList.map((el: CountryListType) => <Search key={el.id}
                                                                  id={el.id}
                                                                  country={el.country}
                                                                  onSubmit={callBackFind}
                                                                  onRemove={callBackRemoveSearchField}
                                                                 />
                )}
            </div>
        </div>
    )
}