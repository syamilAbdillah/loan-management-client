import React from 'react'
import {useForm} from 'react-hook-form'

// shared component
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'
import BaseSelect from '../../share/BaseSelect'

// custom hook
import useFetch from '../../share/useFetch'
import {useAuth} from '../../contexts/AuthContext'

// utils
import deepCopy from '../../utils/deepCopy'

export default function CreateCreditModal({closeModal, getInitialOpt}){
	const url = `${import.meta.env.VITE_BASEURL}/credit`
	const getDebtorUrl = `${import.meta.env.VITE_BASEURL}/debtor`
	const creditCb = {
		onSuccess: () => closeModal()
	}

	const {
		manualFetch, 
		isLoading: creditLoading
	} = useFetch(url, getInitialOpt('POST'), true, creditCb)
	const {
		data: debtors, 
		isLoading: debtorLoading
	} = useFetch(getDebtorUrl, getInitialOpt())

	const {register, handleSubmit, formState: {errors}} = useForm()
	
	function onSubmit(data){
		const requestBody = {
			...data, 
			nominal: data.nominal * 1,
			date: new Date(data.date)
		}

		manualFetch(requestBody)
	}

	return (
		<BaseModal 
			onSubmit={handleSubmit(onSubmit)} 
			closeModal={closeModal} 
			title="add new credit"
			isLoading={creditLoading}
		>
			<BaseInput
				label="date"
				name="date"
				inputType="date"
				register={register}
				isError={errors.date}
				schema={{required: true}}
			/>
			<BaseInput
				label="nominal"
				name="nominal"
				inputType="number"
				register={register}
				isError={errors.nominal}
				schema={{required: true}}
			/>
			<BaseInput
				label="desc"
				name="desc"
				register={register}
				isError={errors.desc}
				schema={{required: true}}
			/>
			<BaseSelect
				label="Debtors"
				name="DebtorId"
				register={register}
				isError={errors.DebtorId}
				schema={{required: true}}
				options={debtors}
			/>
		</BaseModal>
	)
}