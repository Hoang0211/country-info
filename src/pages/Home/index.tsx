import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { FaGlobeAmericas } from 'react-icons/fa'

import Form from '../../components/Form'
import CountryRow from '../../components/CountryRow'
import { SidebarContext } from '../../context/sidebar-context'
import { ThemeContext } from '../../context/theme-context'
import { AppState } from '../../types'
import './home.scss'

export default function Home() {
  const { showSidebar } = useContext(SidebarContext)
  const { theme } = useContext(ThemeContext)

  const { allCountries, isLoading, error } = useSelector(
    (state: AppState) => state.country
  )

  return (
    <div className={`home ${showSidebar ? 'home-push' : ''}`}>
      <FaGlobeAmericas className="icon home__globe" />
      <h1 className={`home__title home__title-${theme}`}>Country API</h1>
      <Form />
      {isLoading && (
        <p className={`home__loading home__loading-${theme}`}>Loading ...</p>
      )}
      {error && <p className={`home__error home__error-${theme}`}>{error}</p>}
      {!isLoading && !error && (
        <div className="home__table">
          <table>
            <thead>
              <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Capital</th>
                <th>Region</th>
                <th>Population</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {allCountries.map((country) => {
                return <CountryRow key={country.commonName} country={country} />
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
