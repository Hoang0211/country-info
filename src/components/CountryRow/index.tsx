import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

import { CountryProps } from '../../types'
import { ThemeContext } from '../../context/theme-context'
import './countryRow.scss'

const CountryRow = ({ country }: CountryProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <tr className="country-row">
      <td>
        <img
          className="country-row__img"
          alt={`${country.commonName} img`}
          src={country.flag}
        />
      </td>
      <td>
        <Link to={`/country/${country.commonName}`}>{country.commonName}</Link>
      </td>
      <td>{country.capital}</td>
      <td>{country.region}</td>
      <td>{country.population.toLocaleString('en-us')}</td>
      <td className={`country-row__favorite country-row__favorite-${theme}`}>
        {country.favorite ? (
          <MdFavorite className="icon country-row__icon" />
        ) : (
          <MdOutlineFavoriteBorder className="icon country-row__icon" />
        )}
      </td>
    </tr>
  )
}

export default CountryRow
