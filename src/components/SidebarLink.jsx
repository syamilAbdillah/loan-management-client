import React from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/sidebar-link.css'

export default function SidebarLink({icon, text, link}){
	return (
		<NavLink exact className="sidebar-link" activeClassName="is-active" to={link} title={text}>
			<i className={icon}></i>
			<span>{text}</span>
		</NavLink>
	)
}