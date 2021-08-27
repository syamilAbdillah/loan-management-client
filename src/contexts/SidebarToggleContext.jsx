import React, {createContext, useState, useContext} from 'react'

const SidebarToggleContext = createContext(true)

export const useToggle = () => useContext(SidebarToggleContext)

export default function SidebarToggleProvider({children}){
	const [isCollapse, setCollapse] = useState(true)
	const collapseToggle = () => setCollapse(!isCollapse) 

	return (
		<SidebarToggleContext.Provider value={{ isCollapse, collapseToggle }}>
			{ children }
		</SidebarToggleContext.Provider>
	)
}