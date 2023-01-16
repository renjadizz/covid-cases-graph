import {Button} from "antd"
import React from "react"

type AddSearchPropsType = {
    onButtonClick: () => void
}

export const AddSearch = (props: AddSearchPropsType) => {
    return <Button type="primary" onClick={props.onButtonClick}>Add Field</Button>
}