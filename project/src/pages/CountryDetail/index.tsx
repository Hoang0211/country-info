import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CountryCard from '../../components/CountryCard'
import { SidebarContext } from '../../context/sidebar-context'
import { ThemeContext } from '../../context/theme-context'
import { AppState } from '../../types'
import './countryDetail.scss'

const CountryDetail = () => {
  const { name } = useParams<{ name?: string }>()

  const { showSidebar } = useContext(SidebarContext)
  const { theme } = useContext(ThemeContext)

  const { allCountries, isLoading, error } = useSelector(
    (state: AppState) => state.country
  )

  const thisCountry = allCountries.find(
    (country) => country.commonName === name
  )

  return (
    <div
      className={`country-detail country-detail-${theme} ${
        showSidebar ? 'country-detail-push' : ''
      }`}
    >
      {isLoading && <p className={`country-detail__loading`}>Loading ...</p>}
      {error && <p className={`country-detail__error`}>{error}</p>}
      {!isLoading && !error && !thisCountry && (
        <p className={`country-detail__error`}>No Country Found!!!</p>
      )}
      {!isLoading && !error && thisCountry && (
        <CountryCard country={thisCountry} />
      )}
    </div>
  )
}

export default CountryDetail
