import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

import { CountryProps } from '../../types'
import { ThemeContext } from '../../context/theme-context'
import { addFavoriteCountry, removeFavoriteCountry } from '../../redux/actions'
import './countryRow.scss'

const CountryRow = ({ country }: CountryProps) => {
  const dispatch = useDispatch()

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
        <Link
          className="country-row__link"
          to={`/country/${country.commonName}`}
        >
          {country.commonName}
        </Link>
      </td>
      <td>{country.capital ? country.capital : 'N/A'}</td>
      <td>{country.region}</td>
      <td>{country.population.toLocaleString('en-us')}</td>
      <td className={`country-row__favorite country-row__favorite-${theme}`}>
        {country.favorite ? (
          <MdFavorite
            className="icon country-row__icon"
            onClick={() => dispatch(removeFavoriteCountry(country.commonName))}
          />
        ) : (
          <MdOutlineFavoriteBorder
            className="icon country-row__icon"
            onClick={() => dispatch(addFavoriteCountry(country.commonName))}
          />
        )}
      </td>
    </tr>
  )
}

export default CountryRow
