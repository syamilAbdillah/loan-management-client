import React, {useState} from 'react'
import AddButton from '../../share/AddButton'
import DebtorModal from '../../components/modals/DebtorModal'
import DebtorTable from '../../components/tables/DebtorTable'

export default function Debtors(props){
	const [isModalActive, setIsModalActive] = useState(false) 
	const openModal = () => setIsModalActive(true)
	const closeModal = () => setIsModalActive(false)

	return (
		<>
			{isModalActive && <DebtorModal closeModal={closeModal} />}
			<AddButton
				text="add new debtor"
				onClick={openModal}
			/>
			<DebtorTable/>
		</>
	)
}