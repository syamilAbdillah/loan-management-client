import React from 'react'
import BaseTable from '../../share/BaseTable'
import LoadingRows from './LoadingRows'
import EditButton from '../../share/EditButton'
import DeleteButton from '../../share/DeleteButton'
import DetailButton from '../../share/DetailButton'
import formatDate from '../../utils/formatDate'
import NumberToRupiah from '../../utils/NumberToRupiah'

export default function CreditTable(props){
	return (
		<CreditTableLayout>
			{ 
				(props.credits && !props.isLoading)? 
				<CreditTableBody {...props} /> : 
				<tbody><LoadingRows/></tbody> 
			}
		</CreditTableLayout>
	)
}

function CreditTableBody({ credits }){
	return credits.map(function(credit, index){
		return (
			<tr key={credit.id}>
				<td>{index + 1}</td>
				<td>{formatDate(credit.date)}</td>
				<td>{credit.desc}</td>
				<td>{NumberToRupiah(credit.nominal)}</td>
				<td>{credit.Debtor.name}</td>
				<td>
					<span className="buttons">
						<DetailButton to={`/credit/${credit.id}`}/>						
					</span>
				</td>
			</tr>
		)
	})
}

function CreditTableLayout({children}){
	return (
		<BaseTable>
			<thead>
				<tr>
					<th>#</th>
					<th>date</th>
					<th>desc</th>
					<th>nominal</th>
					<th>debtor</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{children}
			</tbody>
		</BaseTable>
	)
}