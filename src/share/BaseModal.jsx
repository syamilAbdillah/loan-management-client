import React from 'react'

function BaseModal(props){
	return (
		<div className="modal is-active">
			<div className="modal-background"></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">{props.title || 'modal'}</p>
	      		<button className="delete" aria-label="close" onClick={props.closeModal} ></button>
				</header>
				<section className="modal-card-body">
					{ props.children }
				</section>
				<footer className="modal-card-foot">
					<button onClick={props.closeModal} className="button is-link is-light">cancle</button>
					<button onClick={props.onSubmit} className="button is-light is-link is-outlined">submit</button>
				</footer>
			</div>	
		</div>
	)
}

export default BaseModal