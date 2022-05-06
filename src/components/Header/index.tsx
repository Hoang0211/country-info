import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'

import { SidebarContext } from '../../context/sidebar-context'
import { ThemeContext } from '../../context/theme-context'
import { AppState } from '../../types'
import './header.scss'

const Header = () => {
  const { showSidebar, toggleSidebar } = useContext(SidebarContext)
  const { theme } = useContext(ThemeContext)

  const { favoriteCountries } = useSelector((state: AppState) => state.country)

  return (
    <header>
      <nav className={`nav ${showSidebar ? 'nav-push' : ''} nav-${theme}`}>
        <button className="nav__hamburger" onClick={toggleSidebar}>
          <GiHamburgerMenu className="icon nav__hamburger-icon" />
        </button>

        <button className="nav__logo">
          <NavLink className="nav__link" to={`/`}>
            Country API
          </NavLink>
        </button>

        <button className="nav__favorite">
          <span className="icon nav__favorite-icon">
            <MdOutlineFavoriteBorder />
          </span>
          <span className="nav__favorite-badge">
            {favoriteCountries.length}
          </span>
        </button>
      </nav>
    </header>
  )
}

export default Header
