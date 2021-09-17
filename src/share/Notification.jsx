import React from 'react'
import '../styles/notification-wrapper.css'

export default function Notification({ message, status, isActive, onClose }){
	return (
		<div className={isActive ? 'notification-wrapper is-active':"notification-wrapper"}>
			<div className={status ? `notification is-${status}`: 'notification is-success'}>
				<button 
					onClick={onClose} 
					className="delete">					
				</button>
				{message || "test notification !!!!"}
			</div>
		</div>
	)
}