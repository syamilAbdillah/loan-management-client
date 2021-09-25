import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

// share component
import BaseInput from '../../share/BaseInput'
import BaseModal from '../../share/BaseModal'

// custom hook
import { useAuth } from '../../contexts/AuthContext'
import useAsync from '../../share/useAsync'
import { useNotification } from '../../contexts/NotificationContext'

// utils
import formatDate from '../../utils/formatDate'

export default function EditDebtModal({closeModal, debt, onSuccess}){
	const url = import.meta.env.VITE_BASEURL + '/debt/' + debt.id
	const { getAuthenticateHeader } = useAuth()
	const { showNotif } = useNotification()
	const { handleSubmit, reset, register, formState: {errors} } = useForm()
	const { callAsync: editDebt, isLoading: editLoading } = useAsync({
		onSuccess: () => {
			closeModal()
			showNotif('success edit debt')
			onSuccess()
		},
		onError: () => {
			closeModal()
			showNotif('failed edit debt', 'danger')
		}
	})

	function onSubmit(data){
		const requestBody = JSON.stringify({
			date: new Date(data.date),
			nominal: data.nominal * 1,
			desc: data.desc,
			CreditorId: debt.Contact.id
		})

		const opt = getAuthenticateHeader('PATCH')
		opt.body = requestBody
		editDebt(url, opt)
	}

	useEffect(() => {
		reset({
			date: formatDate(debt.date),
			nominal: debt.nominal,
			desc: debt.desc
		})
	}, [])

	return (
		<BaseModal
			closeModal={closeModal}
			onSubmit={handleSubmit(onSubmit)}
			title="add new debt"
		>
			<BaseInput
				label="date"
				inputType="date"
				name="date"
				register={register}
				isError={errors.date}
				errorMessage="date field is required"
				schema={{required: true}}
			/>
			<BaseInput
				label="nominal"
				inputType="number"
				name="nominal"
				register={register}
				isError={errors.nominal}
				errorMessage="nominal field is required"
				schema={{required: true}}
			/>
			<BaseInput
				label="desc"
				name="desc"
				register={register}
				isError={errors.desc}
				errorMessage="desc field is required"
				schema={{required: true}}
			/>
		</BaseModal>		
	)
}