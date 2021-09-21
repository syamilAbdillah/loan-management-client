import React, {useState} from 'react'

// share component
import AddButton from '../../share/AddButton'

// helper component
import DebtTable from '../../components/tables/DebtTable'
import CreateDebtModal from '../../components/modals/CreateDebtModal'
import EditDebtModal from '../../components/modals/EditDebtModal'

// custom hook
import { useAuth } from '../../contexts/AuthContext'
import useFetch from '../../share/useFetch'
import { useNotification } from '../../contexts/NotificationContext'

export default function Debts(props){
	const url = import.meta.env.VITE_BASEURL + '/debt'
	const { showNotif } = useNotification()
	const { getAuthenticateHeader } = useAuth()
	const {
		data: debts, 
		setData: setDebts, 
		isLoading: isDebtsLoading,
		manualFetch: reFetch 
	} = useFetch(url, getAuthenticateHeader('GET'))
	

	// handle create new debt
	const [isCreateModalActive, setIsCreateModalActive] = useState(false) 
	function closeCreateModal(){
		setIsCreateModalActive(false)
	}
	function openCreateModal(){
		setIsCreateModalActive(true)
	}

	// handle edit existing debt
	const [isEditModalActive, setIsEditModalActive] = useState(false)
	const [selectedDebt, setSelectedDebt] = useState({})
	function openEditModal(debt){
		setSelectedDebt(debt)
		setIsEditModalActive(true)
	}
	function closeEditModal(){
		setSelectedDebt({})
		setIsEditModalActive(false)
	}

	// handle delete
	const [deleteLoading, setDeleteLoading] = useState(false) 
	const [deletedID, setDeletedID] = useState('')

	function handleDelete(id){
		const isConfirmed = confirm('are you sure ?')
		if(!isConfirmed) return

		const opt = getAuthenticateHeader('DELETE')
		const url = import.meta.env.VITE_BASEURL + '/debt/' + id
		
		setDeletedID(id)
		setDeleteLoading(true)

		fetch(url, opt)
			.then(resp => {
				if(resp.status != 200) throw new Error(resp.status)
				setDebts(debts.filter(debt => debt.id != id))
				showNotif('success delete debt')
			})
			.catch(error => {
				showNotif('failed delete debt', 'danger')
			})
			.finally(() => {
				setDeleteLoading(false)
				setDeletedID('')
			})
	}

	return (
		<>
			{ 
				isCreateModalActive && 
				<CreateDebtModal
					closeModal={closeCreateModal}
					onSuccess={reFetch}
				/>
			}
			{
				isEditModalActive && 
				<EditDebtModal
					closeModal={closeEditModal}
					debt={selectedDebt}
					onSuccess={reFetch}
				/>
			}
			<AddButton 
				onClick={openCreateModal} 
				text="add new debt" 
			/>
			<DebtTable 
				debts={debts} 
				isLoading={isDebtsLoading}
				onEdit={openEditModal}
				onDelete={handleDelete}
			/>
		</>
	)
}