import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

export default function ProtectedRoute({
	component: Component, 
	...rest
}){
	const auth = useAuth()

	return (
		<Route {...rest} render={(routerProps => {
			if(auth.authData.accessToken && rest.path == '/auth'){
				return <Redirect to={"/"} />
			}
			if(!auth.authData.accessToken && rest.path != '/auth'){
				return <Redirect to={"/auth"} />
			}
			return <Component {...routerProps} />
		})}/>
	)
}