import React, { useContext, useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaGlobeAmericas } from 'react-icons/fa'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

import Form from '../../components/Form'
import CountryRow from '../../components/CountryRow'
import { SidebarContext } from '../../context/sidebar-context'
import { ThemeContext } from '../../context/theme-context'
import { AppState, Country, SortBased, SortOrder } from '../../types'
import './home.scss'

export default function Home() {
  const [input, setInput] = useState('')
  const [filteredArr, setFilteredArr] = useState<Country[]>([])
  const [sortBased, setSortBased] = useState<SortBased>(SortBased.Population)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Ascending)

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
    let clonedAllCountries = allCountries.map((country) => country)

    if (sortBased === SortBased.Name) {
      clonedAllCountries.sort((a: Country, b: Country) =>
        a.commonName.localeCompare(b.commonName)
      )
    } else if (sortBased === SortBased.Capital) {
      clonedAllCountries.sort((a: Country, b: Country) =>
        a.capital[0]?.localeCompare(b.capital[0])
      )
    } else if (sortBased === SortBased.Region) {
      clonedAllCountries.sort((a: Country, b: Country) =>
        a.region.localeCompare(b.region)
      )
    } else {
      clonedAllCountries.sort(
        (a: Country, b: Country) => b.population - a.population
      )
    }

    if (sortOrder === SortOrder.Descending) {
      clonedAllCountries.reverse()
    }

    if (input.length > 0) {
      setFilteredArr(
        clonedAllCountries.filter((country: Country) =>
          country.commonName.startsWith(
            input[0].toUpperCase() + input.substring(1).toLowerCase()
          )
        )
      )
    } else {
      setFilteredArr(clonedAllCountries)
    }
  }, [input, allCountries, sortOrder, sortBased])

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const changeSortType = (based: SortBased) => {
    if (sortBased === based) {
      if (sortOrder === SortOrder.Ascending) {
        setSortOrder(SortOrder.Descending)
      } else {
        setSortOrder(SortOrder.Ascending)
      }
    } else {
      setSortBased(based)
    }
  }

  const sortDisplay = (based: SortBased) => {
    if (sortBased === based) {
      if (sortOrder === SortOrder.Ascending) {
        return <AiOutlineArrowDown className="icon icon-sort" />
      } else {
        return <AiOutlineArrowUp className="icon icon-sort" />
      }
    } else {
      return <></>
    }
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
                <th className="table__header table__header-flag">Flag</th>
                <th
                  className="table__header table__header-name"
                  onClick={() => changeSortType(SortBased.Name)}
                >
                  Name {sortDisplay(SortBased.Name)}
                </th>
                <th
                  className="table__header table__header-capital"
                  onClick={() => changeSortType(SortBased.Capital)}
                >
                  Capital {sortDisplay(SortBased.Capital)}
                </th>
                <th
                  className="table__header table__header-region"
                  onClick={() => changeSortType(SortBased.Region)}
                >
                  Region {sortDisplay(SortBased.Region)}
                </th>
                <th
                  className="table__header table__header-population"
                  onClick={() => changeSortType(SortBased.Population)}
                >
                  Population {sortDisplay(SortBased.Population)}
                </th>
                <th className="table__header table__header-fav">Favorite</th>
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
