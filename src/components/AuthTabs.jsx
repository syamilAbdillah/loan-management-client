import React from 'react'

export default function AuthTabs({isLogin, renderLogin, renderRegister}){
	const loginClassName = isLogin ? 'is-active': ''
	const registerClassName = isLogin ? '': 'is-active'
	return (
		<div className="tabs is-centered is-boxed mt-4">
			<ul>
				<li onClick={renderLogin} className={loginClassName}>
					<a>Login</a>
				</li>
				<li onClick={renderRegister} className={registerClassName}>
					<a>Register</a>
				</li>
			</ul>
		</div>
	)
}