import React, { useState } from 'react'
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import ProtectedRoute from './share/ProtectedRoute'
import AuthProvider, {useAuth} from './contexts/AuthContext'
import Dashboard from './pages/Dashboard'
import AuthPage from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
   const auth = useAuth()
   const isAuthenticated = auth.authData.accessToken ? "already login": "not login yet"
   console.log(isAuthenticated) 

   return (
      <Router>
         <Switch>
            <ProtectedRoute 
               path="/auth" 
               component={AuthPage} 
            />
            <Route path="/404">
               <NotFoundPage/>
            </Route>
            <ProtectedRoute 
               path="/"  
               component={Dashboard}
            />
         </Switch>
      </Router>
   )
}

export default App
