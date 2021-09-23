import React from 'react'
import BaseTable from '../../share/BaseTable'
import formatDate from '../../utils/formatDate'
import NumberToRupiah from '../../utils/NumberToRupiah'
import EditButton from '../../share/EditButton'
import DeleteButton from '../../share/DeleteButton'
import LoadingRows from './LoadingRows'

export default function PaymentTable(props){
	return (
		<BaseTable>
			<PaymentTableHead/>
			<LoadingRows/>
		</BaseTable>
	)
}

function PaymentTableHead(){
	return (
		<thead>
			<tr>
				<th>#</th>
				<th>date</th>
				<th>nominal</th>
				<th></th>
			</tr>
		</thead>
	)
}

function PaymentTableBody({ payments }){
	return (
		<tbody>
			{ 
				payments.map((payment, index) => {
					return (
						<tr key={payment.id}>
							<td>{index + 1}</td>
							<td>{formatDate(payment.date)}</td>
							<td>{NumberToRupiah(payment.nominal)}</td>
							<td>
								<span className="buttons">
									
								</span>
							</td>
						</tr>
					)
				}) 
			}
		</tbody>
	)
}