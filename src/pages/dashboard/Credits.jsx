import React, {useState} from 'react'

// share component
import AddButton from '../../share/AddButton'

// helper component
import CreditTable from '../../components/tables/CreditTable'
import CreateCreditModal from '../../components/modals/CreateCreditModal'
import EditCreditModal from '../../components/modals/EditCreditModal'

// hook
import useFetch from '../../share/useFetch'
import {useAuth} from '../../contexts/AuthContext'
import {useNotification} from '../../contexts/NotificationContext'

// utils
import deepCopy from '../../utils/deepCopy'

export default function Credits(props){
	const {showNotif} = useNotification()
	const auth = useAuth()
	const url = `${import.meta.env.VITE_BASEURL}/credit`
	const {data: credits, isLoading, setData: setCredits, manualFetch}  = useFetch(url, getInitialOpt())
	
	function getInitialOpt(method = 'GET'){
		return {
			method, 
			headers: {
				'Content-Type': 'application/json',
				'Authorization': auth.getBearer()
			}		
		}
	} 

	// create modal state
	const [isCreateModalActive, setIsCreateModalActive] = useState(false) 
	const openCreateModal = () => setIsCreateModalActive(true)
	const closeCreateModal = () => {
		setIsCreateModalActive(false)
		manualFetch()
	}

	// edit modal state
	const [isEditModalActive, setIsEditModalActive] = useState(false)
	const [selectedCredit, setSelectedCredit] = useState({})
	function openEditModal(credit){
		setSelectedCredit(credit)
		setIsEditModalActive(true)
	}
	function closeEditModal(){
		setIsEditModalActive(false)
		setSelectedCredit({})
		manualFetch()
	}

	// handle delete
	const [deleteLoading, setDeleteLoading] = useState(false)
	const [whileDeleting, setWhileDeleting] = useState('')
	function handleDelete(id){
		const willDeleteUrl = `${url}/${id}`
		setWhileDeleting(id)
		const isConfirmed = confirm(`are you sure want to delete this ?`)
		console.log(isConfirmed)
		if(isConfirmed){
			setDeleteLoading(true)
			fetch(willDeleteUrl, getInitialOpt('DELETE'))
				.then(function(resp){
					if(resp.status != 200) throw new Error('failed delete')
					showNotif('success delete credit')
					setCredits(credits.filter(credit => credit.id != id))
				})
				.catch(function(error){
					console.log(error)
					showNotif('failed delete credit', 'danger')
				})
				.finally(() => {
					setDeleteLoading(false)
				})
		} 
	}
	return (
		<>
			{
				isCreateModalActive && 
				<CreateCreditModal 
					getInitialOpt={getInitialOpt}
					closeModal={closeCreateModal} 
				/>
			}
			{
				isEditModalActive && 
				<EditCreditModal 
					getInitialOpt={getInitialOpt} 
					closeModal={closeEditModal} 
					selectedCredit={selectedCredit}
				/>
			}
			<AddButton onClick={openCreateModal} text="add new credit"/>
			<CreditTable 
				credits={credits} 
				isLoading={isLoading}
				deleteLoading={deleteLoading}
				whileDeleting={whileDeleting}
				onDelete={handleDelete} 
				onEdit={openEditModal} 
			/>
		</>
	)
}