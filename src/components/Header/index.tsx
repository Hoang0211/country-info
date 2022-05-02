import React, { useContext } from 'react'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'

import { SidebarContext } from '../../context/sidebar-context'
import { ThemeContext } from '../../context/theme-context'

import './header.scss'

const Header = () => {
  const { showSidebar, toggleSidebar } = useContext(SidebarContext)
  const { theme } = useContext(ThemeContext)

  return (
    <header>
      <nav className={`nav ${showSidebar ? 'nav-push' : ''} nav-${theme}`}>
        <button className="nav__hamburger" onClick={toggleSidebar}>
          <GiHamburgerMenu className="icon nav__hamburger-icon" />
        </button>

        <button className="nav__logo">Country API</button>

        <button className="nav__favorite">
          <span className="icon nav__favorite-icon">
            <MdOutlineFavoriteBorder />
          </span>
          <span className="nav__favorite-badge">250</span>
        </button>
      </nav>
    </header>
  )
}

export default Header
