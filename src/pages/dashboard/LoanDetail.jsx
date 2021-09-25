import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'

// helper component
import PaymentTable from '../../components/tables/PaymentTable'
import EditDebtModal from '../../components/modals/EditDebtModal'
import EditCreditModal from '../../components/modals/EditCreditModal'

// share component
import Time from '../../share/Time'
import EditButton from '../../share/EditButton'
import DeleteButton from '../../share/DeleteButton'
import AddButton from '../../share/AddButton'

// custom hook
import useFetch from '../../share/useFetch'
import useAsync from '../../share/useAsync'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'

// utils
import NumberToRupiah from '../../utils/NumberToRupiah'

export default function LoanDetail(props){
	const { showNotif } = useNotification()
	const location = useLocation()
	const debtOrCredit = location.pathname.split('/')[1]
	const { id } = useParams()
	const history = useHistory()
	const { getAuthenticateHeader } = useAuth()
	const url = import.meta.env.VITE_BASEURL + location.pathname
	const { data: loan, isLoading, manualFetch: reFetch } = useFetch(url, getAuthenticateHeader('GET'))
	const { callAsync: deleteLoan, isLoading: deleteLoading } = useAsync({
		onSuccess: function(){
			history.push(`/${debtOrCredit}`)
		},
		onError: function(){
			showNotif(`failed deleting this ${debtOrCredit}`, 'danger')
		}
	})
	

	// is /debt/:id ?
	const isDebt = debtOrCredit == 'debt'
	const [isEditLoan, setEditLoan] = useState(false) 
	function successEditLoan(){
		setEditLoan(false)
		showNotif('success edit ' + debtOrCredit)
		reFetch()
	}


	// handle delete
	function handleDelete(){
		const isConfirmed = confirm('are you sure ??')
		if(!isConfirmed) return


		deleteLoan(url, getAuthenticateHeader('DELETE'))
	}

	return (
		<>
			{ 
				isEditLoan && 
				isDebt &&
				<EditDebtModal 
					debt={{...loan, id} || {}} 
					onSuccess={successEditLoan}
					closeModal={() => setEditLoan(false)}
				/>
				
			}
			{
				isEditLoan && 
				!isDebt &&
				<EditCreditModal
					credit={{...loan, id}|| {}}
					onSuccess={successEditLoan}
					closeModal={() => setEditLoan(false)}
				/>  
			}
			<LoanDetailHeader 
				isLoading={isLoading} 
				loan={loan} 
				onEdit={() => setEditLoan(true)} 
				onDelete={handleDelete}
			/>
			<AddButton text="create payment" />
			<PaymentTable payments={loan?.Payments || []} isLoading={isLoading}/>
		</>
	)
}

function LoanDetailHeader({isLoading, loan, onEdit, onDelete}){

	if(isLoading) return <CardLoading/>;
	
	function totalPayments(payments){

		if(!payments) return 0

		return payments.reduce((acc, curr) => acc + curr.nominal, 0)
	}
	
	return (
		<>
			<div className="columns">
				<div className="column">
					<LoanDetailCard 
						name={loan?.Contact.name}
						date={loan?.date}
						desc={loan?.desc}
						nominal={loan?.nominal}
						onEdit={onEdit}
						onDelete={onDelete}
					/>
				</div>
			</div>
			<div className="columns">
				<div className="column">
					<LoanCurrency
						variant="success"
						title="paid"
						nominal={totalPayments(loan?.Payments)}
					/>
				</div>
				<div className="column">
					<LoanCurrency
						variant="danger"
						title="remaining"
						nominal={loan?.nominal - totalPayments(loan?.Payments) || 0}
					/>
				</div>
			</div>
			<hr className="devider"></hr>
		</>
	)
}


function LoanDetailCard({name, desc, date, nominal, onEdit, onDelete}){
	return (
		<div className="card">
			<div className="card-content">
				<div className="columns">
					<div className="column">
						<div className="content">
							<h4>{ name }</h4>
							<p>{ desc }</p>
							<Time stringDate={date || '2000-01-01'}/>
						</div>
					</div>
					<div className="column is-flex is-flex-direction-column">
						<h4 className="title is-3">
							{ NumberToRupiah(nominal || '0') }
						</h4>
						<span className="buttons has-text-right">
							<EditButton onClick={onEdit}/>
							<DeleteButton onClick={onDelete}/>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

const CardLoading = props => (
	<div className="block box p-6 is-flex is-justify-content-center">
		<div className="loader my-6"></div>
	</div>
)

function LoanCurrency({nominal, variant, title}){
	const className = variant ? `message is-${variant}`: 'message'
	
	return (
		<article className={className}>
   		<div className="message-header">
    			<p>{title}</p>
   		</div>
  			<div className="message-body">
  				<h4 className="title is-4">{NumberToRupiah(nominal)}</h4>
    		</div>
		</article>
	)
}

