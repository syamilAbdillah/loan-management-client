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
			{ 
				props.isLoading && 
				<tbody>
					<LoadingRows/>
				</tbody>
			}
			{
				!props.isLoading &&
				<PaymentTableBody payments={props.payments}/>
			}
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
			{	payments.length < 1 ?
				<tr><td>empty</td></tr>:
				payments.map((payment, index) => {
					return (
						<tr key={payment.id}>
							<td>{index + 1}</td>
							<td>{formatDate(payment.date)}</td>
							<td>{NumberToRupiah(payment.nominal)}</td>
							<td>
								<span className="buttons">
									<EditButton variant="small" />
									<DeleteButton variant="small" />
								</span>
							</td>
						</tr>
					)
				}) 
			}
		</tbody>
	)
}