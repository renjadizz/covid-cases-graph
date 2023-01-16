import React from "react"

type CountryType = {
    id: number
    country: string
}
export const Search = (props: CountryType) => {
    return (
        <div>{props.id} {props.country}</div>
    )
}