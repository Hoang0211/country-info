import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import SidebarProvider from './context/sidebar-context'
import ThemeProvider from './context/theme-context'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Routes from './Routes'
import { fetchCountry } from './redux/actions'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountry())
  }, [dispatch])

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
