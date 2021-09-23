import React from 'react'

export default function Progress({variant, max, value}){
	const className = `progress ${!variant ? 'is-primary': variant}`
	return (
		<progress 
			className={className} 
			max={max} 
			value={value}
		>
		</progress>
	)
}