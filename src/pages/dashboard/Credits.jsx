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

	return (
		<>
			{
				isCreateModalActive && 
				<CreateCreditModal 
					getInitialOpt={getInitialOpt}
					closeModal={closeCreateModal} 
				/>
			}
			<AddButton onClick={openCreateModal} text="add new credit"/>
			<CreditTable 
				credits={credits} 
				isLoading={isLoading}
			/>
		</>
	)
}