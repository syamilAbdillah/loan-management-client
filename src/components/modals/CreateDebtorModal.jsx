import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'
import {useAuth}from '../../contexts/AuthContext' 
import useFetch from '../../share/useFetch'
import {useNotification} from '../../contexts/NotificationContext'

const URL = `${import.meta.env.VITE_BASEURL}/debtor`

export default function CreateDebtorModal(props){
	const auth = useAuth()
	const {showNotif} = useNotification()
	const initialOpt = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': auth.getBearer()
		}
	}
	const fetcher = useFetch(URL, initialOpt, true, {
		onFinish: () => props.closeModal(),
		onSuccess: () => showNotif('success create new debtor'),
		onError: () => showNotif('fail create new debtor', 'danger')
	})
	const {register, handleSubmit, formState: {errors}} = useForm()
	const onSubmit = (data) => {
		fetcher.manualFetch(data)
	}


	return (
		<BaseModal
			{...props}
			title="add new debtor"
			isLoading={fetcher.isLoading}
			onSubmit={handleSubmit(onSubmit)}
			closeModal={props.closeModal}
		>
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
		</BaseModal>
	)
}