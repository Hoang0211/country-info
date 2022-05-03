import React, { useContext } from 'react'
import { useSelector } from 'react-redux'

import { SidebarContext } from '../../context/sidebar-context'
import { AppState } from '../../types'
import './home.scss'

export default function Home() {
  const { showSidebar } = useContext(SidebarContext)

  const allCountries = useSelector(
    (state: AppState) => state.country.allCountries
  )

  return (
    <div className={`home ${showSidebar ? 'home-push' : ''}`}>
      <h1>Home page</h1>
      {console.log(allCountries)}
    </div>
  )
}
