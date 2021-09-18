import React from 'react'
import CreditTable from '../../components/tables/CreditTable'
import AddButton from '../../share/AddButton'

export default function Credits(props){
	return (
		<>
			<AddButton text="add new credit"/>
			<CreditTable/>
		</>
	)
}