import React from 'react'
import '../styles/basetable.css'

export default function BaseTable({children}){
	return (
		<div className="table-container">
			<table className="table is-hoverable is-fullwidth">
				{ children }
			</table>
		</div>
	)
}