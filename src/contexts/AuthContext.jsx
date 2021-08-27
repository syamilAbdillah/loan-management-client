import React, {useState, useEffect, useContext} from 'react'

const AuthContext = React.createContext({})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
	const [authData, setAuthData] = useState({accessToken: null})

	const setAuthCredential = (email, password) => {
		// normaly we fetch to auth endpoint to get an access token 

		// this is a fake token
		setAuthData({accessToken: "highly secure token... hehehe"}) 
	}

	const destroyAuthCredential = () => setAuthData({accessToken: null})
	
	// get initial auth state in the first time
	useEffect(() => {
		setAuthData({accessToken: localStorage.getItem("accessToken")})
	}, [])

	// syncronize auth state and localStorage
	useEffect(() => {
		localStorage.setItem('accessToken', authData.accessToken)
		
		if(!authData.accessToken){
			localStorage.removeItem('accessToken')
		}

	}, [authData.accessToken])

	return (
		<AuthContext.Provider value={{authData, setAuthCredential, destroyAuthCredential}}>
			{ children }
		</AuthContext.Provider>
	)
}