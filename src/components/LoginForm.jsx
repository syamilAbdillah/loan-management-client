import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import {useHistory} from 'react-router-dom'
import BaseInput from '../share/BaseInput'
import {useAuth} from '../contexts/AuthContext'

const schema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required()
})

export default function LoginForm(props){
	const auth = useAuth()
	const history = useHistory()
	const {register, handleSubmit, formState: {errors}} = useForm({
		resolver: yupResolver(schema)
	})

	console.log(history)

	const handleLogin = ({email, password}) => {
		auth.setAuthCredential(email, password, (error) => {
			if(error){
				history.push('/')
			}
		})
	}

	return(
		<>
			<BaseInput
				inputType="email"
				label="email"
				name="email"
				register={register}
				isError={errors.email}
				errorMsg={errors.email?.message}
			/>
			<BaseInput
				inputType="password"
				label="password"
				name="password"
				register={register}
				isError={errors.password}
				errorMsg={errors.password?.message}
			/>
			<button onClick={handleSubmit(handleLogin)} className="button is-primary">
				login
			</button>
		</>
	)
}