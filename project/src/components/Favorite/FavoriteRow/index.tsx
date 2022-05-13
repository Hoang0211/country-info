import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

import {
  addFavoriteCountry,
  removeFavoriteCountry,
} from '../../../redux/actions'
import { CountryProps } from '../../../types'
import { ThemeContext } from '../../../context/theme-context'
import './favoriteRow.scss'

const FavoriteRow = ({ country }: CountryProps) => {
  const dispatch = useDispatch()

  const { theme } = useContext(ThemeContext)

  return (
    <div className={`favorite-row favorite-row-${theme}`}>
      <Link
        className="favorite-row__link"
        to={`/country/${country.commonName}`}
      >
        {country.commonName}
      </Link>
      {country.favorite ? (
        <MdFavorite
          className="icon favorite-row__icon"
          onClick={() => dispatch(removeFavoriteCountry(country.commonName))}
        />
      ) : (
        <MdOutlineFavoriteBorder
          className="icon favorite-row__icon"
          onClick={() => dispatch(addFavoriteCountry(country.commonName))}
        />
      )}
    </div>
  )
}

export default FavoriteRow
