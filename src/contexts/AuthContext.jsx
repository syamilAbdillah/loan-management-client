import React, {useState, useEffect, useContext} from 'react'

const AuthContext = React.createContext({})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}){
	const [authData, setAuthData] = useState({accessToken: null})

	const setAuthCredential = (email, password, callback = () => null) => {
		// normaly we fetch to auth endpoint to get an access token 

		// this is a fake token
		setAuthData({accessToken: "highly secure token... hehehe"})
		callback() 
	}

	const destroyAuthCredential = () => setAuthData({accessToken: null})
	
	// get initial auth state in the first time
	useEffect(() => {
		setAuthData({accessToken: localStorage.getItem("accessToken")})
	}, [])

	// syncronize auth state and localStorage
	useEffect(() => {
		localStorage.setItem('accessToken', authData.accessToken)
		
		const isAuthExist = !authData.accessToken || 
									authData.accessToken == 'undefined' || 
									authData.accessToken == 'null' 

		if(isAuthExist){
			localStorage.removeItem('accessToken')
		}

	}, [authData.accessToken])

	return (
		<AuthContext.Provider value={{authData, setAuthCredential, destroyAuthCredential}}>
			{ children }
		</AuthContext.Provider>
	)
}