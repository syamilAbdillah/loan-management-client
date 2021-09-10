import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'
import BaseInput from '../share/BaseInput'
import useFetch from '../share/useFetch'


const schema = yup.object().shape({
	name: yup.string().trim().required(),
	email: yup.string().email().required(),
	password: yup.string().trim().min(8).max(16).required(),
	confirmPassword: yup.string()
							  .trim()
							  .test(
								  	'isSameAsPassword', 
								  	'not match to password field', 
								  	(value, ctx) => value === ctx.parent.password 
							  	)
							  .required()
})
const URL = import.meta.env.VITE_BASEURL + "/auth/register"
const initialOpt = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	}
}


export default function RegisterForm(props){
	const {register, handleSubmit, formState: {errors}, reset} = useForm({
		resolver: yupResolver(schema)
	})

	const callbacks = {
		onSuccess: () => {
			reset({
				name: '',
				email: '',
				password: '',
				confirmPassword: ''
			})
		}
	}
	
	const {
		data: user, 
		isLoading, 
		hasError, 
		ErrorMessage, 
		manualFetch, 
		opt
	} = useFetch(URL, initialOpt,true, callbacks)

	const handleRegister = (data) => {
		manualFetch(data)		
	}
	
	return(
		<>
			<BaseInput
				label="name"
				name="name"
				register={register}
				isError={errors.name}
				errorMsg={errors.name?.message}
			/>
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
			<BaseInput
				inputType="password"
				label="confirm password"
				name="confirmPassword"
				register={register}
				isError={errors.confirmPassword}
				errorMsg={errors.confirmPassword?.message}
			/>
			<button 
				onClick={handleSubmit(handleRegister)} 
				className={`button is-primary ${isLoading ? 'is-loading': ''}`} 
				disabled={isLoading}
			>
				register
			</button>
		</>
	)
}