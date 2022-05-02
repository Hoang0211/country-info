import React from 'react'

import SidebarProvider from './context/sidebar-context'
import ThemeProvider from './context/theme-context'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Routes from './Routes'

export default function App() {
  return (
    <SidebarProvider>
      <ThemeProvider>
        <Header />
        <main>
          <Sidebar />
          <Routes />
        </main>
      </ThemeProvider>
    </SidebarProvider>
  )
}
