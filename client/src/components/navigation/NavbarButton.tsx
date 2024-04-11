import React from "react"

type NavbarButtonProps = {
	onClick:() => void
	title: string

}

export function NavbarButton({title, onClick}:NavbarButtonProps) {
	return (<div style={{cursor: "pointer"}} onClick={onClick}>
		{title}
	</div>)
}