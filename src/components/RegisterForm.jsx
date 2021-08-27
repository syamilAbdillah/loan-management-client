import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import BaseInput from '../share/BaseInput'

export default function RegisterForm(props){
	const [email, setEmail] = useState('') 
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')

	const emailChange = (e) => setEmail(e.target.value)
	const passwordChange = (e) => setPassword(e.target.value)
	const nameChange = (e) => setName(e.target.value)
	
	return(
		<>
			<BaseInput
				label="name"
				handleChange={nameChange}
				value={name}
			/>
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
			<button className="button is-primary">
				register
			</button>
		</>
	)
}