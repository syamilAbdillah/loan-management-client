import React, {useState} from 'react'
import Notification from '../../share/Notification'

export default function HomeDashboard(props){
	const [isNotifActive, setIsNotifActive] = useState(false)
	const [timeoutID, setTimeoutID] = useState()

	function closeNotif(){
		setIsNotifActive(false)
		clearTimeout(timeoutID)
		console.log('close notif')
	}

	function showNotif(){
		if(setIsNotifActive){
			setIsNotifActive(false)
			clearTimeout(timeoutID)
		}
		setIsNotifActive(true)
		const currentTimeoutID = setTimeout(() => setIsNotifActive(false),3000)
		setTimeoutID(currentTimeoutID)
	}
	return (
		<>
			<Notification
				message="f*cking Notification"
				status="success"
				isActive={isNotifActive}
				inActive={closeNotif}
			/>
			<button onClick={showNotif} className="button is-primary">
				show Notification !!
			</button>
			<h1 className="title is-1">
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				fffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				fffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				fffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				fffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				fffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				fffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				fffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				fffffffffffffffffffffffffffff
				Home Dashboard
				aalfskdfjlsakdjflaskdjflsakdfljaskdffffffffffffffffffffffffffffffff
				{import.meta.env.MODE}
			</h1>
		</>
	)
}