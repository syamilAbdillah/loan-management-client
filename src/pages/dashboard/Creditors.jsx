import React, {useState, useEffect} from 'react'

import AddButton from '../../share/AddButton'
import CreditorTable from '../../components/tables/CreditorTable'
import CreateCreditorModal from '../../components/modals/CreateCreditorModal'
import EditCreditorModal from '../../components/modals/EditCreditorModal'

// custom hook
import useFetch from '../../share/useFetch'
import useAsync from '../../share/useAsync'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'

export default function Creditors(props){
	const url = import.meta.env.VITE_BASEURL + '/creditor'
	
	const {getBearer} = useAuth()
	const {
		data: creditors, 
		setData: setCreditors, 
		isLoading, 
		manualFetch: reFetch
	} = useFetch(url, getInitialOpt())

	// create modal
	const [isCreateModalActive, setIsCreateModalActive] = useState(false)
	function closeCreateModal(){
		setIsCreateModalActive(false)
		reFetch()
	}
	function openCreateModal(){
		setIsCreateModalActive(true)
	}

	// edit modal
	const [isEditModalActive, setIsEditModalActive] = useState(false)
	const [selectedCreditor, setSelectedCreditor] = useState({})
	function openEditModal(creditor){
		setIsEditModalActive(true)
		setSelectedCreditor(creditor)
	}
	function closeEditModal(){
		setSelectedCreditor({})
		setIsEditModalActive(false)
		reFetch()
	}

	// handle delete 
	const { showNotif } = useNotification()
	const [deletedID, setDeletedID] = useState('')
	const [deleteLoading, setDeleteLoading] = useState(false)
	function handleDelete(id){
		setDeletedID(id)
		setDeleteLoading(true)
		fetch(`${url}/${id}`, getInitialOpt('DELETE'))
			.then(resp => {
				if(resp.status != 200) throw new Error(resp.status)

				setCreditors(creditors.filter(creditor => creditor.id != id))
				showNotif('success delete creditor data')
			})
			.catch(error => {
				showNotif('failed delete creditor', 'danger')
			})
			.finally(() => {
				setDeleteLoading(false)
			})
	}

	function getInitialOpt(method = 'GET'){
		return {
			method,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': getBearer()
			}
		}
	}

	return (
		<>
			{ isCreateModalActive && <CreateCreditorModal closeModal={closeCreateModal} /> }
			{ 
				isEditModalActive && 
				<EditCreditorModal 
					closeModal={closeEditModal} 
					creditor={selectedCreditor}
				/> 
			}
			<AddButton 
				onClick={openCreateModal} 
				text="add new creditor" 
			/>
			<CreditorTable
				isLoading={isLoading}
				creditors={creditors}
				onEdit={openEditModal}
				onDelete={handleDelete}
				deleteLoading={deleteLoading}
				deletedID={deletedID}
			/>
		</>
	)
}