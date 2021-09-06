import React, { useEffect, useState } from 'react'
import BaseTable from '../share/BaseTable'
import deepCopy from '../utils/deepCopy'

export default function TableRandomUsers(props){
	
	const URL = 'https://jsonplaceholder.typicode.com/users'
	const [users, setUsers] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [test, setTest] = useState(0)

	const getUsers = (url) => {
		setIsLoading(true)
		fetch(url)
			.then(res => res.json())
			.then(data => {
				setUsers(data)
				setIsLoading(false)
			})
			.catch(error => {
				console.log(error)
				setIsLoading(false)
			})
	}

	useEffect(() => {
		getUsers(URL)
	}, [URL])



	const handleClickRow = (index) => {
		const currentUsers = deepCopy(users)
		currentUsers.splice(index, 1)
		setUsers(currentUsers)
	}

	return (
		<>
			<BaseTable>
				<thead onClick={() => getUsers(URL)}>
					<tr>
						<th>Name</th><th>City</th>
					</tr>
				</thead>
				<tbody>
					{	
						users.map((user, index)=> {
							return (
								<tr onClick={() => handleClickRow(index)} key={user.id}>
									<td>{user.name}</td><td>{user.address.city}</td>
								</tr>
							)
						})
					}{
						isLoading && (<tr><td>loading....</td><td></td></tr>)
					}
				</tbody>
			</BaseTable>
		</>
	)
}