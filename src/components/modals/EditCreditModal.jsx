import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'

// shared component
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'
import BaseSelect from '../../share/BaseSelect'

// custom hook
import useFetch from '../../share/useFetch'
import { useNotification } from '../../contexts/NotificationContext'

// utils
import formatDate from '../../utils/formatDate'

export default function EditCreditModal({closeModal, getInitialOpt, selectedCredit}){
	const {showNotif} = useNotification()
	const url = `${import.meta.env.VITE_BASEURL}/credit/${selectedCredit.id}`
	const responseCb = {
		onSuccess: () => showNotif('success edit credit'),
		onError: () => showNotif('failed edit credit', 'danger'),
		onFinish: () => closeModal()
	}

	const {
		manualFetch, 
		isLoading: creditLoading
	} = useFetch(url, getInitialOpt('PATCH'), true, responseCb)

	const {register, handleSubmit, reset, formState: {errors}} = useForm()

	function onSubmit(data){
		const requestBody = {
			date: new Date(data.date),
			nominal: data.nominal * 1,
			desc: data.desc,
			DebtorId: selectedCredit.Debtor.id
		}

		manualFetch(requestBody)
	}

	useEffect(() => {
		reset({
			date: formatDate(selectedCredit.date),
			nominal: selectedCredit.nominal,
			desc: selectedCredit.desc
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