import React, {useState, useContext, createContext} from 'react'

const NotificationContext = createContext({})

export const useNotification = () => useContext(NotificationContext)

export default function NotificationProvider({children}){
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState('')
	const [isNotifActive, setIsNotifActive] = useState(false)
	const [timeoutID, setTimeoutID] = useState()

	function showNotif(newMessage, newStatus){
		if(setIsNotifActive){
			closeNotif()
		}

		setMessage(newMessage)
		setStatus(newStatus)
		setIsNotifActive(true)
		const currentTimeoutID = setTimeout(() => setIsNotifActive(false),3000)
		setTimeoutID(currentTimeoutID)
	}

	function closeNotif(){
		setIsNotifActive(false)
		clearTimeout(timeoutID)
	}

	return (
		<NotificationContext.Provider 
			value={{
				message,
				status,
				isNotifActive,
				timeoutID,
				showNotif,
				closeNotif
			}}
		>
			{children}
		</NotificationContext.Provider>
	)
}