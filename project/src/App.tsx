import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SidebarProvider from './context/sidebar-context'
import ThemeProvider from './context/theme-context'
import FavoriteModal from './components/Favorite/FavoriteModal'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Routes from './Routes'
import { fetchCountry } from './redux/actions'
import { AppState } from './types'

export default function App() {
  const dispatch = useDispatch()

  const { showModal } = useSelector((state: AppState) => state.modal)

  useEffect(() => {
    dispatch(fetchCountry())
  }, [dispatch])

  return (
    <SidebarProvider>
      <ThemeProvider>
        {showModal && <FavoriteModal />}
        <Header />
        <main>
          <Sidebar />
          <Routes />
        </main>
      </ThemeProvider>
    </SidebarProvider>
  )
}
