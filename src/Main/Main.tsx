import React from "react"
import {useState} from "react"
import {Search} from "../Search/Search"
import {CovidApi} from "../API/API"
import {AddSearch} from "../AddSearch/AddSearch"
import {Graph} from "../Graph/Graph"
import styles from "./main.module.sass"

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
    const callBackAddSearchField = () => {
        let lastId = countryList.slice(-1)
        let newId = Number(lastId[0].id) + 1
        const newValues: CountryListType[] = [...countryList, {id: newId, country: "", data: []}]
        setCountryList(newValues)
    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.header}>
                <div className={styles.search}>
                    {countryList.map((el: CountryListType) => <Search key={el.id}
                                                                      id={el.id}
                                                                      country={el.country}
                                                                      onSubmit={callBackFind}
                                                                      onRemove={callBackRemoveSearchField}/>
                    )}
                </div>
                <div className={styles.btnSearch}><AddSearch onButtonClick={callBackAddSearchField}/></div>
            </div>
            <div className={styles.footer}><Graph countryList={countryList}/></div>
        </div>
    )
}