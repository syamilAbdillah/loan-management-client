import React from 'react'

// share component
import BaseTable from '../../share/BaseTable'
import DeleteButton from '../../share/DeleteButton'
import EditButton from '../../share/EditButton'
import DetailButton from '../../share/DetailButton'
import LoadingRows from './LoadingRows'

// utils
import formatDate from '../../utils/formatDate'
import NumberToRupiah from '../../utils/NumberToRupiah'

export default function DebtTable(props){
	return (
		<BaseTable>
			<DebtTableHead/>
			<DebtTableBody {...props} />
		</BaseTable>
	)
}

function DebtTableBody({ debts, isLoading}){
	return(
		<tbody>
			{ 
				(isLoading || !debts) ?
				<LoadingRows/>:
				debts.map(function(debt, index){
					return (
						<tr key={debt.id} >
							<td>{ index + 1 }</td>
							<td>{ formatDate(debt.date) }</td>
							<td>{ debt.desc }</td>
							<td>{ NumberToRupiah(debt.nominal) }</td>
							<td>{ debt.Creditor.name }</td>
							<td>
								<span className="buttons">		
									<DetailButton
										to={`/debt/${debt.id}`}
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

function DebtTableHead(){
	return(
		<thead>
			<tr>
				<td>#</td>
				<td>date</td>
				<td>desc</td>
				<td>nominal</td>
				<td>creditor</td>
				<td></td>
			</tr>
		</thead>
	)
}