import React from "react"
import {useEffect, useState} from 'react'
import CanvasJSReact from '../lib/canvasjs.react'
import {CountryListType} from "../Main/Main"

type CountryListPropsType ={
    countryList:CountryListType[]
}
type DataPointsType = {
    y: number
    x: Date
}
type DataPointsInfoType = {
    type: string,
    name: string,
    xValueFormatString: string,
    showInLegend: boolean,
    dataPoints: DataPointsType[]
}
type CasesType = {
    total: number
}
type CountryDataType = {
    cases: CasesType,
    day: string
}
export const Graph = ({countryList}: CountryListPropsType) => {
    const [dataPointsInfoObj, setDataPointsInfoObj] = useState({})
    useEffect(() => {
        let dataPointsInfo: DataPointsInfoType[] = []
        countryList.forEach((country: CountryListType) => {
            let dataPoints: DataPointsType[] = []
            let reverseCountryData: any = country.data.slice().reverse()
            reverseCountryData.forEach((countryData: CountryDataType, i: number) => {
                if (i < reverseCountryData.length - 1) {
                    if (new Date(countryData.day).getMonth() !== new Date(reverseCountryData[i + 1].day).getMonth()) {
                        dataPoints.push({y: countryData.cases.total, x: new Date(countryData.day.slice(0, 7))})
                    }
                } else {
                    dataPoints.push({y: countryData.cases.total, x: new Date(countryData.day.slice(0, 7))})
                }
            })
            dataPointsInfo.push({
                type: "spline",
                name: country.country,
                xValueFormatString: "MMM YYYY",
                showInLegend: true,
                dataPoints: dataPoints
            })
        })

        let options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Number of Total Cases"
            },
            axisX: {
                ValueFormatString: "MMM YYYY",
            },
            toolTip: {
                shared: true
            },
            data: dataPointsInfo
        }
        setDataPointsInfoObj(options)
    }, [countryList])

    const CanvasJSChart = CanvasJSReact.CanvasJSChart


    return (<div>
        <CanvasJSChart options={dataPointsInfoObj}/></div>)
}

