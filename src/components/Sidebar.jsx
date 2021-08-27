import React from 'react'
import SidebarLink from './SidebarLink'
import {useToggle} from '../contexts/SidebarToggleContext'
import '../styles/sidebar.css'

export default function Sidebar(props){
	const {isCollapse} = useToggle()

	return (
		<aside className={`sidebar ${isCollapse && 'collapsed'}`}>
			<SidebarLink text="Dashboard" icon="fas fa-chart-bar" link="/"/>
			<SidebarLink text="Credit" icon="fas fa-hand-holding-usd" link="/credits"/>
			<SidebarLink text="Debt" icon="fas fa-money-bill-wave" link="/debts"/>
			<SidebarLink text="Creditor" icon="fas fa-user-plus" link="/creditors"/>
			<SidebarLink text="Debtor" icon="fas fa-user-minus" link="/debtors"/>
		</aside>
	)
}