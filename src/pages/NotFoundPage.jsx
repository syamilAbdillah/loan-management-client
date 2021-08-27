import React from 'react'
import {Link} from 'react-router-dom'
import FullCenterLayout from '../share/FullCenterLayout'

export default function NotFoundPage(props){
	return (
		<FullCenterLayout optClasses=" flex-column" >
			<h1 className="title is-1 mr-4">404</h1>
			<Link className="button is-ghost" to="/">
				<i className="fas fa-arrow-left mr-4"></i>
				<span>back to home</span>
			</Link>		
		</FullCenterLayout>
	)
}