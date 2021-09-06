import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {useToggle} from '../contexts/SidebarToggleContext'
import {useAuth} from '../contexts/AuthContext'
import '../styles/navbar.css'

export function Hamburger({onClick}){
	const {isCollapse,collapseToggle} = useToggle()
	const className = `button ${!isCollapse ?'is-light is-primary':'is-white'}`
	return (
		<button onClick={collapseToggle} className={className}>
			<i className="fas fa-bars"></i>
		</button>
	)
}

export function LogoutButton(){
	const history = useHistory()
	const auth = useAuth()	
	const handleLogout = () => {
		/* code here... */
		auth.destroyAuthCredential()
		history.push("/auth")
	}

	return (
		<button onClick={handleLogout} className="button is-danger is-outlined">
			logout
		</button>
	)
}

export default function Navbar(props){
	return (
		<nav className="navbar is-fixed-top" role="navigation" aria-label="dropdown navigation">
			<div className="navbar-brand">
				<a className="navbar-item">
					<Hamburger/>
				</a>
			</div>
		</nav>
	)
}