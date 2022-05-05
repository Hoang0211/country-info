import React, { useContext, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaGlobeAmericas } from 'react-icons/fa'

import Form from '../../components/Form'
import CountryRow from '../../components/CountryRow'
import { SidebarContext } from '../../context/sidebar-context'
import { ThemeContext } from '../../context/theme-context'
import { AppState, Country } from '../../types'
import './home.scss'

export default function Home() {
  const [input, setInput] = useState('')
  const [filteredArr, setFilteredArr] = useState<Country[]>([])

  const inputRef = useRef<HTMLInputElement>(null) // For focus the first time

  const { showSidebar } = useContext(SidebarContext)
  const { theme } = useContext(ThemeContext)

  const { allCountries, isLoading, error } = useSelector(
    (state: AppState) => state.country
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    let allContriesClone = allCountries
    if (input.length > 0) {
      setFilteredArr(
        allContriesClone.filter((country: Country) =>
          country.commonName.startsWith(
            input[0].toUpperCase() + input.substring(1).toLowerCase()
          )
        )
      )
    } else {
      setFilteredArr(allContriesClone)
    }
  }, [input, allCountries])

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  return (
    <div className={`home ${showSidebar ? 'home-push' : ''}`}>
      <FaGlobeAmericas className="icon home__globe" />
      <h1 className={`home__title home__title-${theme}`}>Country API</h1>
      <Form input={input} inputHandler={inputHandler} inputRef={inputRef} />
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
              {filteredArr.map((country) => {
                return <CountryRow key={country.commonName} country={country} />
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
