import React, {useState} from 'react'

// share component
import AddButton from '../../share/AddButton'

// helper component
import DebtTable from '../../components/tables/DebtTable'
import CreateDebtModal from '../../components/modals/CreateDebtModal'

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

	return (
		<>
			{ 
				isCreateModalActive && 
				<CreateDebtModal
					closeModal={closeCreateModal}
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
			/>
		</>
	)
}