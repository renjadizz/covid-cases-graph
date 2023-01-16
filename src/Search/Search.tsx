import React from "react"
import countryData from '../data/all_countries.json'
import {Select} from 'antd'
import './search.css'

type SearchPropsType = {
    id: number
    country: string
    onSubmit: (id: number, value: string) => void
    onRemove: (id: number) => void
}
export const Search = (props: SearchPropsType) => {
    const onSelect = (value: string) => {
        props.onSubmit(props.id, value)
    }
    const onClear = () => {
        props.onRemove(props.id)
    }

    return (
        <Select
            placeholder="Select a country"
            size="middle"
            dropdownMatchSelectWidth={false}
            allowClear
            showSearch
            options={countryData.map((country) => {
                return ({label: country.country, value: country.country})
            })}
            style={{width: 200}}
            onClear={onClear}
            onSelect={onSelect}
        />
    )
}