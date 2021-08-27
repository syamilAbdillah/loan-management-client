import React, {useState} from 'react'
import FullCenterLayout from '../share/FullCenterLayout'
import AuthTabs from '../components/AuthTabs'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'


export default function AuthPage(props){
	const [isLogin, setIsLogin] = useState(true)
	
	const renderLogin = () => setIsLogin(true)
	const renderRegister = () => setIsLogin(false)

	console.log(props)

	return (
		<FullCenterLayout>
			<div className="card">
				<AuthTabs 
					isLogin={isLogin}
					renderLogin={renderLogin} 
					renderRegister={renderRegister} 
				/>
				<div className="card-content">
					{
						isLogin ? 
							<LoginForm/>: <RegisterForm/>
					}
				</div>
			</div>
		</FullCenterLayout>
	)
}