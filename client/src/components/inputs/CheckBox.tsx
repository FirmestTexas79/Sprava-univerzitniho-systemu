import React from "react"
import {Checkbox} from "@mui/material"

type CheckBoxProps = {
	onPress:() => void
	value?:boolean
}


export function CheckBox({onPress, value}:CheckBoxProps){
	return (<Checkbox onClick={onPress} value={value}/>)
}