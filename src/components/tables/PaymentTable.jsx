import React from 'react'
import BaseTable from '../../share/BaseTable'
import formatDate from '../../utils/formatDate'
import NumberToRupiah from '../../utils/NumberToRupiah'
import EditButton from '../../share/EditButton'
import DeleteButton from '../../share/DeleteButton'
import LoadingRows from './LoadingRows'

export default function PaymentTable({isLoading, ...rest}){
	return (
		<BaseTable>
			<PaymentTableHead/>
			{ 
				isLoading && 
				<tbody>
					<LoadingRows/>
				</tbody>
			}
			{
				!isLoading &&
				<PaymentTableBody {...rest}/>
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

function PaymentTableBody({ payments, onEdit, onDelete, deleteLoading, deleted }){
	return (
		<tbody>
			{	
				payments.length < 1 ?
				<tr><td>empty</td></tr>:
				payments.map((payment, index) => {
					return (
						<tr key={payment.id}>
							<td>{index + 1}</td>
							<td>{formatDate(payment.date)}</td>
							<td>{NumberToRupiah(payment.nominal)}</td>
							<td>
								<span className="buttons">
									<EditButton 
										onClick={() => onEdit(payment)} 
										variant="small" 
									/>
									<DeleteButton 
										onClick={() => onDelete(payment)}
										isLoading={payment.id == deleted.id ? deleteLoading : false} 
										variant="small" 
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