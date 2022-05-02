import React, { useState, createContext } from 'react'

type SidebarContextType = {
  showSidebar: boolean
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextType>({
  showSidebar: false,
  toggleSidebar: () => {},
})

const SidebarProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState)
  }

  return (
    <SidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export default SidebarProvider
