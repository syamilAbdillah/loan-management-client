import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

// helper component
import PaymentTable from '../../components/tables/PaymentTable'

// share component
import Time from '../../share/Time'
import EditButton from '../../share/EditButton'
import DeleteButton from '../../share/DeleteButton'
import AddButton from '../../share/AddButton'

// custom hook
import useFetch from '../../share/useFetch'

// utils
import NumberToRupiah from '../../utils/NumberToRupiah'

export default function LoanDetail(props){
	
	const mock = {
		name: 'john doe',
		desc: 'bla bla bla bla',
		date: new Date(),
		nominal: 5000
	}

	const location = useLocation()
	const params = useParams()

	console.log(location, params)

	return (
		<>
			<LoanDetailHeader>
				<LoanDetailCard 
					name={mock.name}
					desc={mock.desc}
					date={mock.date}
					nominal={mock.nominal}
				/>
				<LoanCurrency
					variant="success"
					title="paid"
					nominal={4000}
				/>
				<LoanCurrency
					variant="danger"
					title="remaining"
					nominal={1000}
				/>
			</LoanDetailHeader>
			<AddButton text="create payment" />
			<PaymentTable/>
		</>
	)
}

function LoanDetailHeader({children}){

	const isArray = children instanceof Array

	return (
		<>
			<div className="columns">
				<div className="column">
					{ isArray ? children[0]: children }
				</div>
			</div>
			{
				isArray && 
				<div className="columns">
					<div className="column">
						{ children[1] }
					</div>
					<div className="column">
						{ children[2] }
					</div>
				</div>
			}
			<hr className="devider"></hr>
		</>
	)
}


function LoanDetailCard({name, desc, date, nominal}){
	return (
		<div className="card">
			<div className="card-content">
				<div className="columns">
					<div className="column">
						<div className="content">
							<h4>{ name }</h4>
							<p>{ desc }</p>
							<Time stringDate={date}/>
						</div>
					</div>
					<div className="column is-flex is-flex-direction-column">
						<h4 className="title is-3">
							{ NumberToRupiah(nominal) }
						</h4>
						<span className="buttons has-text-right">
							<EditButton/>
							<DeleteButton/>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

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

