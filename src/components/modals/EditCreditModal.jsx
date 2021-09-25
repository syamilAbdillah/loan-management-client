import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'

// shared component
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'
import BaseSelect from '../../share/BaseSelect'

// custom hook
import useFetch from '../../share/useFetch'
import useAsync from '../../share/useAsync'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'

// utils
import formatDate from '../../utils/formatDate'

export default function EditCreditModal({closeModal, onSuccess, credit}){
	const {showNotif} = useNotification()
	const {getAuthenticateHeader} = useAuth()
	const {register, handleSubmit, reset, formState: {errors}} = useForm()

	const url = `${import.meta.env.VITE_BASEURL}/credit/${credit.id}`
	const responseCb = {
		onSuccess: () => {
			onSuccess()
			showNotif('success edit credit')
		},
		onError: () => showNotif('failed edit credit', 'danger'),
		onFinish: () => closeModal()
	}
	const { callAsync, isLoading: creditLoading } = useAsync(responseCb)


	function onSubmit(data){
		const requestBody = JSON.stringify({
			date: new Date(data.date),
			nominal: data.nominal * 1,
			desc: data.desc,
			DebtorId: credit.Contact.id
		})

		const opt = getAuthenticateHeader('PATCH')
		opt.body = requestBody
		callAsync(url ,opt)
	}

	useEffect(() => {
		reset({
			date: formatDate(credit.date),
			nominal: credit.nominal,
			desc: credit.desc
		})
	}, [])


	return (
		<BaseModal 
			onSubmit={handleSubmit(onSubmit)} 
			closeModal={closeModal} 
			title="edit credit data"
			isLoading={creditLoading}
		>
			<BaseInput
				label="date"
				name="date"
				inputType="date"
				register={register}
				isError={errors.date}
				errorMsg="this field is required"
				schema={{required: true}}
			/>
			<BaseInput
				label="nominal"
				name="nominal"
				inputType="number"
				register={register}
				isError={errors.nominal}
				errorMsg="this field is required"
				schema={{required: true}}
			/>
			<BaseInput
				label="desc"
				name="desc"
				register={register}
				isError={errors.desc}
				errorMsg="this field is required"
				schema={{required: true}}
			/>
		</BaseModal>
	)
}