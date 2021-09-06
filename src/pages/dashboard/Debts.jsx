import React, {useState} from 'react'
import TableRandomUsers from '../../components/TableRandomUsers'
import BaseModal from '../../share/BaseModal'

export default function Debts(props){
	const [isModalActive, setIsModalActive] = useState(false) 
	const openModal = () => setIsModalActive(true)
	const closeModal = () => setIsModalActive(false)
	const handleSubmit = () => console.log('submited')

	return (
		<>
			{
				isModalActive && 
				<BaseModal 
					closeModal={closeModal}
					onSubmit={handleSubmit}
					title="test"
				>
					<h1>test</h1>
				</BaseModal> 
			}
			<button onClick={() => setIsModalActive(true)} className="button is-primary my-6">
				add new blabla...
			</button>
			<TableRandomUsers/>
		</>
	)
}