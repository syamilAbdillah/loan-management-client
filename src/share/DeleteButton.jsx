import React from 'react'

export default function AddButton({text, variant, isLoading ,...rest}){
	const baseClassName = "button is-danger"
	const className = !variant ? baseClassName: `${baseClassName} is-${variant}`
	const classNameWithLoadingState = isLoading ? `${className} is-loading`: className 
	return (
		<button 
			className={classNameWithLoadingState} 
			disabled={isLoading} 
			{...rest}
		>
			<span className="icon is-small">
				<i className="fas fa-trash-alt"></i>
			</span>
			<span>{text || "delete"}</span>
		</button>
	)
}