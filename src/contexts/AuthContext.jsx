import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import useFetch from '../share/useFetch'

// initial
const AuthContext = React.createContext({})
const URL = `${import.meta.env.VITE_BASEURL}/auth/login`
const INITIAL_OPT = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
}
const INITIAL_AUTH_CREDENTIAL = {accessToken: null, id: null, name: null, emial: null}

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
	const [authData, setAuthData] = useState(INITIAL_AUTH_CREDENTIAL)
	const history = useHistory()	
	const {
		data: authCredential,
		isLoading, 
		hasError, 
		ErrorMessage, 
		manualFetch, 
		opt		
	} = useFetch(URL, INITIAL_OPT, true, {
		onSuccess: () => {
			history.push('/')
		}
	})


	const setAuthCredential = (email, password, callback = () => null) => {
		// normaly we fetch to auth endpoint to get an access token 
		manualFetch({email, password})
	}

	const getBearer = () => {
		const auth = JSON.parse(localStorage.getItem('authCredential'))
		return `Bearer ${auth.accessToken}`
	}

	const destroyAuthCredential = () => setAuthData(INITIAL_AUTH_CREDENTIAL)

	useEffect(() => {
		const setCredential = () => {
			if(!authCredential) return 

			setAuthData({...authCredential})
		}

		setCredential()
	}, [authCredential])
	
	// get initial auth state in the first time
	useEffect(() => {
		setAuthData(
			{
				...JSON.parse(
					localStorage.getItem("authCredential")
				)
			}
		)
	}, [])

	// syncronize auth state and localStorage
	useEffect(() => {
		localStorage.setItem('authCredential', JSON.stringify(authData))
		
		const isAuthExist = !authData.accessToken || 
									authData.accessToken == 'undefined' || 
									authData.accessToken == 'null' 

		if(isAuthExist){
			localStorage.removeItem('authCredential')
		}

	}, [authData])

	return (
		<AuthContext.Provider 
			value={{
				authData, 
				setAuthCredential, 
				destroyAuthCredential,
				getBearer, 
				isLoading, 
				hasError, 
				ErrorMessage 
			}}
		>
			{ children }
		</AuthContext.Provider>
	)
}