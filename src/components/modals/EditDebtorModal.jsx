import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'
import {useAuth}from '../../contexts/AuthContext' 
import useFetch from '../../share/useFetch'


export default function EditDebtorModal(props){
	const URL = `${import.meta.env.VITE_BASEURL}/debtor/${props.debtorId}`
	const auth = useAuth()
	const getInitialOpt = (method) => ({
		method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': auth.getBearer()
		}
	})

	const editFetcher = useFetch(URL, getInitialOpt('PATCH'), true, {
		onFinish: () => props.closeModal()
	})

	const {register, handleSubmit, reset, formState: {errors}} = useForm()

	const getFetcher = useFetch(URL, getInitialOpt('GET'))

	const onSubmit = (data) => {
		editFetcher.manualFetch(data)
	}

	function inputOrLoading(){
		if(getFetcher.isLoading){
			return <div className="loader" ></div>
		}

		return (
			<BaseInput
				label="name"
				isError={errors.name}
				errorMsg="debtor name is required"
				name="name"
				register={register}
				schema={
					{required: true}
				}
			/>
		)
	}

	useEffect(() => {
		reset({name: getFetcher.data?.name})
	}, [getFetcher.data])

	return (
		<BaseModal
			{...props}
			title="edit debtor"
			isLoading={editFetcher.isLoading}
			onSubmit={handleSubmit(onSubmit)}
			closeModal={props.closeModal}
		>
			{ inputOrLoading() }
		</BaseModal>
	)
}