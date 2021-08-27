import React from 'react'

export default function Button({variant, size, icon, text, ...rest}){
	const buttonClassName = `button is-${variant || 'primary'} is-${size || 'normal'}`
	const iconClassName = `fas fa-${icon}`

	return (
		<button {...rest} className={buttonClassName}>
			<span className="icon">
				<i className={iconClassName}></i>
			</span>
			<span>{ text }</span>
		</button>
	)
}