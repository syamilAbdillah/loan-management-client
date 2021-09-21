import React from 'react'
import { useForm } from 'react-hook-form'

// share
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'

// custom hook
import useAsync from '../../share/useAsync'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'

export default function CreateCreditorModal({closeModal}){
	const {handleSubmit, register, formState: {errors}} = useForm()
	const {showNotif} = useNotification() 
	const {callAsync, isLoading} = useAsync({
		onSuccess: () => { 
			closeModal()
			showNotif('success create new creditor')
		}
	})
	const {getBearer} = useAuth()
	const url = import.meta.env.VITE_BASEURL + '/creditor'
	
	function onSubmit(data){
		const requestBody = JSON.stringify(data)

		callAsync(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': getBearer()
			}, 
			body: requestBody
		})
	}
	return (
		<BaseModal
			closeModal={closeModal}
			onSubmit={handleSubmit(onSubmit)}
			isLoading={isLoading}
		>
			<BaseInput
				register={register}
				isError={errors.name}
				errorMsg="this field is required"
				label="name"
				name="name"
				schema={{ required: true }}
			/>
		</BaseModal>
	)
}