import React, { useState } from 'react'
import BaseTable from '../../share/BaseTable'
import EditButton from '../../share/EditButton'
import DeleteButton from '../../share/DeleteButton'

export default function DebtorTable({debtors, openEditModal, handleDeleteDebtor}){

	function loading(){
		return (
			<tr><td>Loading...</td></tr>
		)
	}

	function debtorMapper(debtors){
		return debtors.map((debtor, index) => {
			return(
				<tr key={debtor.id}>
					<td>{index + 1}</td>
					<td>{debtor.name}</td>
					<td>{debtor.remaining}</td>
					<td>
						<EditButton 
							onClick={
								() => openEditModal(debtor.id)
							} 
							variant="small" 
						/>
						<DeleteButton
							onClick={
								() => handleDeleteDebtor(debtor.id)
							} 
							variant="small" 
						/>
					</td>
				</tr>
			)
		})
	}

	return (
		<>
			<BaseTable>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Remaining</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ debtors ? debtorMapper(debtors): loading()}
				</tbody>
			</BaseTable>
		</>
	)
}