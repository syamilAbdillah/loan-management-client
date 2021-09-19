import React from 'react'

export default function EditButton({text, variant,...rest}){
	const baseClassName = "button is-warning"
	const className = !variant ? baseClassName: `${baseClassName} is-${variant}`
	return (
		<button className={className} {...rest}>
			<span className="icon is-small">
				<i className="fas fa-pen"></i>
			</span>
			<span>{text || "edit"}</span>
		</button>
	)
}