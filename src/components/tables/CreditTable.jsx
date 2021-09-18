import React from 'react'
import BaseTable from '../../share/BaseTable'
import LoadingRows from './LoadingRows'

export default function CreditTable(props){
	return (
		<BaseTable>
			<thead>
				<tr>
					<th>#</th>
					<th>amount</th>
					<th>remaining</th>
					<th>debtor</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				<LoadingRows></LoadingRows>
			</tbody>
		</BaseTable>
	)
}