import React, { useContext } from 'react'
import { IoColorPaletteSharp } from 'react-icons/io5'

import { SidebarContext } from '../../context/sidebar-context'
import { ThemeContext } from '../../context/theme-context'
import { Theme } from '../../types'
import './sidebar.scss'

const Sidebar = () => {
  const { showSidebar } = useContext(SidebarContext)
  const { changeTheme } = useContext(ThemeContext)

  return (
    <div className={`sidebar ${showSidebar ? 'sidebar-show' : ''}`}>
      <p className="sidebar__title">Theme</p>
      <ul className="sidebar__themes">
        <li>
          <button
            className="theme theme-red"
            onClick={() => changeTheme(Theme.Red)}
          >
            <span className="theme__text">Red</span>
            <IoColorPaletteSharp className="theme__icon" />
          </button>
        </li>
        <li>
          <button
            className="theme theme-blue"
            onClick={() => changeTheme(Theme.Blue)}
          >
            <span className="theme__text">Blue</span>
            <IoColorPaletteSharp className="theme__icon" />
          </button>
        </li>
        <li>
          <button
            className="theme theme-green"
            onClick={() => changeTheme(Theme.Green)}
          >
            <span className="theme__text">Green</span>
            <IoColorPaletteSharp className="theme__icon" />
          </button>
        </li>
        <li>
          <button
            className="theme theme-purple"
            onClick={() => changeTheme(Theme.Purple)}
          >
            <span className="theme__text">Purple</span>
            <IoColorPaletteSharp className="theme__icon" />
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
