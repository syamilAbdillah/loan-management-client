import React from 'react'
import { NavLink } from 'react-router-dom'

export default function DetailButton({ to }){
	return (
		<NavLink exact to={to} className="button is-primary is-small">
			<span className="icon is-small">
				<i className="fas fa-info"></i>
			</span>
			<span>detail</span>
		</NavLink>
	)
}