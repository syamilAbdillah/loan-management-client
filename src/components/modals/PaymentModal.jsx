import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'
import formatDate from '../../utils/formatDate'

export default function PaymentModal({ onSubmit, onClose, payment, isLoading }){
	
	const {register, reset, handleSubmit, formState: {errors}} = useForm()

	useEffect(() => {
		
		payment && reset({
			nominal: payment.nominal,
			date: formatDate(payment.date)
		})

	}, [])

	return (
		<BaseModal
			onSubmit={handleSubmit(onSubmit)}
			closeModal={onClose}
			isLoading={isLoading}
			title="Payment"
		>
			<BaseInput
				register={register}
				name="date"
				label="date"
				inputType="date"
				isError={errors.date}
				errorMessage="date is required"
			/>
			<BaseInput
				register={register}
				name="nominal"
				label="nominal"
				inputType="number"
				isError={errors.nominal}
				errorMessage="nominal is required"
			/>
		</BaseModal>
	)
}