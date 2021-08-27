import React from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import '../styles/dashboard.css'

export default function DashboardLayout({children}){
	return (
		<div className="dashboard">
			<Sidebar/>
			<div className="dashboard-main">
				<Navbar/>
				<main className="container p-4">
					{children}
				</main>
			</div>
		</div>
	)
}