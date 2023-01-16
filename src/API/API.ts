import axios from "axios"

const instance = axios.create({
    method: 'GET',
    baseURL: 'https://covid-193.p.rapidapi.com/history',
    headers: {
        'X-RapidAPI-Key': 'fe9fbb5daemsh90cf519aa1b9c01p1607e1jsne752cf8792d6',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
})

export const CovidApi = {
    getCountryData(countryName: string): Promise<any> {
        return instance.get(`?country=${countryName}`)
            .then(response => {
                return response.data
            })
    }
}
