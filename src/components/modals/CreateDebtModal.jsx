import React from 'react'
import { useForm } from 'react-hook-form'

// share component
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'
import BaseSelect from '../../share/BaseSelect'

// custom hook
import useAsync from '../../share/useAsync'
import useFetch from '../../share/useFetch'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'

export default function ({closeModal, onSuccess}){
	const baseUrl = import.meta.env.VITE_BASEURL
	const creditorsUrl = baseUrl + '/creditor'
	const debtUrl = baseUrl + '/debt'

	const { showNotif } = useNotification()
	const { getAuthenticateHeader: getAuthHead } = useAuth()
	const { data: creditors, isLoading: creditorsLoading } = useFetch(creditorsUrl, getAuthHead('GET'))
	const { isLoading: createDebtLoading, callAsync: createDebt } = useAsync({
		onSuccess: () => {
			closeModal()
			onSuccess()
			showNotif('success create new debt')
		},
		onError: () => {
			closeModal()
			showNotif('failed create new debt', 'danger')
		}
	})
	const {register, handleSubmit, formState: {errors}} = useForm()

	function onSubmit(data){
		const opt = getAuthHead('POST')
		const requestBody = JSON.stringify(data)
		opt.body = requestBody
		createDebt(debtUrl, opt)
	}
	return (
		<BaseModal
			closeModal={closeModal}
			isLoading={createDebtLoading}
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
			<BaseSelect
				label="Creditors"
				name="CreditorId"
				register={register}
				options={creditors}
				isError={errors.CreditorId}
				schema={{required: true}}
			/>
		</BaseModal>
	)
}