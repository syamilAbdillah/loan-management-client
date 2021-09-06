// 3rd party
import React from 'react'
import {Switch , Route, Redirect} from 'react-router-dom'

// share
import ProtectedRoute from '../share/ProtectedRoute'

// context
import SidebarToggleProvider from '../contexts/SidebarToggleContext'

// component
import DashboardLayout from '../components/DashboardLayout'

//pages
import HomeDashboard from './dashboard/HomeDashboard'
import Creditors from './dashboard/Creditors'
import Debtors from './dashboard/Debtors'
import Credits from './dashboard/Credits'
import Debts from './dashboard/Debts'

export default function Dashboard(props){
	const {children} = props
	
	return (
		<SidebarToggleProvider>
			<DashboardLayout>
	         <Switch>
	         	<ProtectedRoute exact path="/" component={HomeDashboard}/>
	         	<ProtectedRoute path="/creditors" component={Creditors}/>
	         	<ProtectedRoute path="/debtors" component={Debtors}/>
	         	<ProtectedRoute path="/credits" component={Credits}/>
	         	<ProtectedRoute path="/debts" component={Debts}/>
	         	<Route path="*">
	         		<Redirect to="/404" />
	         	</Route>
	         </Switch>	
			</DashboardLayout>
		</SidebarToggleProvider>
	)
}