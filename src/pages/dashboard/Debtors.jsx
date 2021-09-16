import React, {useState} from 'react'
import AddButton from '../../share/AddButton'
import CreateDebtorModal from '../../components/modals/CreateDebtorModal'
import EditDebtorModal from '../../components/modals/EditDebtorModal'
import DebtorTable from '../../components/tables/DebtorTable'
import useFetch from '../../share/useFetch'
import {useAuth} from '../../contexts/AuthContext'

const URL = `${import.meta.env.VITE_BASEURL}/debtor`

export default function Debtors(props){
	const auth = useAuth()
	const INITIAL_OPT = {
		method: 'GET', 
		headers: {
			'Content-Type': 'application/json',
			'Authorization': auth.getBearer()
		}
	}
	const {
		data: debtors,
		setData: setDebtors, 
		manualFetch,
	} = useFetch(URL, INITIAL_OPT)

	const [isCreateModalActive, setIsCreateModalActive] = useState(false) 
	const [isEditModalActive, setIsEditModalActive] = useState(false)
	const [selectedDebtor, setSelectedDebtor] = useState('')
	const openCreateModal = () => setIsCreateModalActive(true)
	const closeCreateModal = () => {
		setIsCreateModalActive(false)
		manualFetch()
	}
	const openEditModal = (id) => {
		setSelectedDebtor(id)
		setIsEditModalActive(true)
	} 
	const closeEditModal = () => {
		setSelectedDebtor('')
		setIsEditModalActive(false)
		manualFetch()
	}
	const handleDeleteDebtor = (id) => {
		const url = `${URL}/${id}`
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Authorization': auth.getBearer()
			}
		})
		.then(resp => {
			if(resp.status != 200){
				throw new Error('unsuccess')
			}
			const newDebtors = debtors.filter(debtor => debtor.id != id)
			setDebtors(newDebtors)
		})
		.catch(error => {
			console.log(error)
		})
	}


	return (
		<>
			{isCreateModalActive && <CreateDebtorModal closeModal={closeCreateModal} />}
			{isEditModalActive && <EditDebtorModal debtorId={selectedDebtor} closeModal={closeEditModal}/>}
			<AddButton
				text="add new debtor"
				onClick={openCreateModal}
			/>
			<DebtorTable debtors={debtors} openEditModal={openEditModal} handleDeleteDebtor={handleDeleteDebtor} />
		</>
	)
}