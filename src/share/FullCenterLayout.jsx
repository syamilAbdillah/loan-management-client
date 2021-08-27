import React from 'react'
import '../styles/utils.css'

export default function FullCenterLayout({children, position, optClasses}){
	const baseClassName = 'all-center fullfill-screen'
	const className = optClasses ? baseClassName: `${baseClassName} ${optClasses}`
	return (
		<div className={className}>
			{children}
		</div>
	)
}