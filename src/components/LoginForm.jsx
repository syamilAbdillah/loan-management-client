import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import BaseInput from '../share/BaseInput'
import {useAuth} from '../contexts/AuthContext'

export default function LoginForm(props){
	const [email, setEmail] = useState('') 
	const [password, setPassword] = useState('')
	const auth = useAuth()
	const history = useHistory()

	console.log(history)

	const emailChange = (e) => setEmail(e.target.value)
	const passwordChange = (e) => setPassword(e.target.value)
	const handleLogin = () => {
		auth.setAuthCredential(email, password)
		history.push('/')
	}

	return(
		<>
			<BaseInput
				inputType="email"
				label="email"
				handleChange={emailChange}
				value={email}
			/>
			<BaseInput
				inputType="password"
				label="password"
				handleChange={passwordChange}
				value={password}
			/>
			<button onClick={handleLogin} className="button is-primary">
				login
			</button>
		</>
	)
}