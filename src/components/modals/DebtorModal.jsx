import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import BaseModal from '../../share/BaseModal'
import BaseInput from '../../share/BaseInput'
 


export default function DebtorModal(props){
	const {register, handleSubmit, formState: {errors}} = useForm()
	const onSubmit = (data) => console.log(data)


	return (
		<BaseModal
			{...props}
			title="add new debtor"
			onSubmit={handleSubmit(onSubmit)}
		>
			<BaseInput
				label="name"
				isError={errors.debtorName}
				errorMsg="debtor name is required"
				name="debtorName"
				register={register}
				schema={
					{required: true}
				}
			/>
		</BaseModal>
	)
}