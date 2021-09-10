import React from 'react'
import BaseTable from '../../share/BaseTable'
import EditButton from '../../share/EditButton'
import DeleteButton from '../../share/DeleteButton'

export default function DebtorTable(props){
	return (
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
				<tr>
					<td>1</td>
					<td>test</td>
					<td>0</td>
					<td>
						<EditButton variant="small" />
						<DeleteButton variant="small" />
					</td>
				</tr>
			</tbody>
		</BaseTable>
	)
}