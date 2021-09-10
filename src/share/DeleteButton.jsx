import React from 'react'

export default function AddButton({text, variant,...rest}){
	const baseClassName = "button mx-2 is-danger"
	const className = !variant ? baseClassName: `${baseClassName} is-${variant}`
	return (
		<button className={className} {...rest}>
			<span className="icon is-small">
				<i className="fas fa-trash-alt"></i>
			</span>
			<span>{text || "delete"}</span>
		</button>
	)
}