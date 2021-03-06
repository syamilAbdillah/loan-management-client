import React from 'react'

export default function AddButton({text, ...rest}){
	return (
		<button className="button my-2 is-primary" {...rest}>
			<span className="icon is-small">
				<i className="fas fa-plus"></i>
			</span>
			<span>{text || "add button"}</span>
		</button>
	)
}