import React, { useContext } from 'react'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

import { CountryProps } from '../../types'
import { ThemeContext } from '../../context/theme-context'
import './country.scss'

const CountryRow = ({ country }: CountryProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <tr className="country">
      <td>
        <img
          className="country__img"
          alt={`${country.commonName} img`}
          src={country.flag}
        />
      </td>
      <td>{country.commonName}</td>
      <td>{country.capital}</td>
      <td>{country.region}</td>
      <td>{country.population.toLocaleString('en-us')}</td>
      <td className={`country__favorite country__favorite-${theme}`}>
        {country.favorite ? (
          <MdFavorite className="icon" />
        ) : (
          <MdOutlineFavoriteBorder className="icon" />
        )}
      </td>
    </tr>
  )
}

export default CountryRow
