import React, { useEffect } from 'react'

// share component
import BaseTable from '../../share/BaseTable'
import DeleteButton from '../../share/DeleteButton'
import EditButton from '../../share/EditButton'
import LoadingRows from './LoadingRows'


export default function CreditorTable(props){

	return (
		<BaseTable>
			<CreditorTableHead/>
			<CreditorTableBody {...props}/>
		</BaseTable>
	)
}

function CreditorTableBody({creditors, isLoading, onEdit, onDelete, deleteLoading, deletedID}){
	return(
		<tbody>
			{
				isLoading || !creditors ?
					<LoadingRows/> :

					creditors.map(function(creditor, index){
						return (
							<tr key={creditor.id} >
								<td>{ index + 1 }</td>
								<td>{ creditor.name }</td>
								<td>0</td>
								<td>
									<span className="buttons">
										<EditButton 
											variant="small"
											onClick={() => onEdit(creditor)} 
										/>
										<DeleteButton 
											variant="small"
											onClick={() => onDelete(creditor.id)} 
											isLoading={deletedID == creditor.id ? deleteLoading: false}
										/>
									</span>
								</td>
							</tr>
						)
					})
					
			}
		</tbody>
	) 
}

function CreditorTableHead(){
	return (
		<thead>
			<tr>
				<th>#</th>
				<th>name</th>
				<th>remaining</th>
				<th></th>
			</tr>
		</thead>
	)
}