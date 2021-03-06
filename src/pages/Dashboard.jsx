// 3rd party
import React from 'react'
import {Switch , Route, Redirect} from 'react-router-dom'

// share
import ProtectedRoute from '../share/ProtectedRoute'

// context
import SidebarToggleProvider from '../contexts/SidebarToggleContext'
import NotificationProvider, {useNotification} from '../contexts/NotificationContext'

// component
import DashboardLayout from '../components/DashboardLayout'
import Notification from '../share/Notification'

//pages
import HomeDashboard from './dashboard/HomeDashboard'
import Creditors from './dashboard/Creditors'
import Debtors from './dashboard/Debtors'
import Credits from './dashboard/Credits'
import Debts from './dashboard/Debts'
import LoanDetail from './dashboard/LoanDetail'

export default function Dashboard(props){
	const {children} = props
	const {message, status, isNotifActive, closeNotif} = useNotification()
	
	return (
			<SidebarToggleProvider>
				<DashboardLayout>
					<Notification 
						message={message} 
						status={status} 
						isActive={isNotifActive} 
						onClose={closeNotif} 
					/>
		         <Switch>
		         	<ProtectedRoute exact path="/" component={HomeDashboard}/>
		         	<ProtectedRoute path="/creditor" component={Creditors}/>
		         	<ProtectedRoute path="/debtor" component={Debtors}/>
		         	<ProtectedRoute path="/credit/:id" component={LoanDetail}/>
		         	<ProtectedRoute path="/debt/:id" component={LoanDetail}/>
		         	<ProtectedRoute path="/credit" component={Credits}/>
		         	<ProtectedRoute path="/debt" component={Debts}/>
		         	<Route path="*">
		         		<Redirect to="/404" />
		         	</Route>
		         </Switch>	
				</DashboardLayout>
			</SidebarToggleProvider>
	)
}