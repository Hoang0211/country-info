import React from 'react'
import { useDispatch } from 'react-redux'
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'

import { addFavoriteCountry, removeFavoriteCountry } from '../../redux/actions'
import { CountryProps } from '../../types'
import './countryCard.scss'

const CountryCard = ({ country }: CountryProps) => {
  const dispatch = useDispatch()

  const arrIterate = (arr: string[]) => {
    let text = ''
    arr.forEach((item) => {
      if (item === arr[0]) {
        text += item
      } else if (item !== arr[arr.length - 1]) {
        text += ', ' + item
      } else {
        text += ', and ' + item
      }
    })
    return text
  }

  const languagesTextConvert = (languages: object) => {
    if (languages === undefined) {
      return 'Languages used in this country data is currently unavailable'
    }

    let languagesArr: string[] = []

    for (const [, value] of Object.entries(languages)) {
      languagesArr.push(value)
    }

    let content = ''

    if (languagesArr.length === 0) {
      content = 'No language is used in this country'
    } else if (languagesArr.length === 1) {
      content = `Language used in ${country.commonName} is ${languagesArr[0]}`
    } else if (languagesArr.length === 2) {
      content = `Languages used in ${country.commonName} are ${languagesArr[0]} and ${languagesArr[1]}`
    } else {
      content = `Languages used in ${country.commonName} are ${arrIterate(
        languagesArr
      )}`
    }

    return content
  }

  const bordersTextConvert = (borders: string[]) => {
    if (borders === undefined) {
      return "This country's borders data is currently unavailable"
    }

    let content = ''

    if (borders.length === 0) {
      content = 'There is no country adjacent to this country'
    } else if (borders.length === 1) {
      content = `Border country is ${borders[0]}`
    } else if (borders.length === 2) {
      content = `Border countries are ${borders[0]} and ${borders[1]}`
    } else {
      content = `Border countries are ${arrIterate(borders)}`
    }

    return content
  }

  const capitalsTextConvert = (capitals: string[]) => {
    if (capitals === undefined) {
      return 'N/A'
    }

    let content = ''

    if (capitals.length === 0) {
      content = 'N/A'
    } else if (capitals.length === 1) {
      content = capitals[0]
    } else if (capitals.length === 2) {
      content = `${capitals[0]} and ${capitals[1]}`
    } else {
      content = arrIterate(capitals)
    }

    return content
  }

  const detail = `The official name is ${country.officialName}. It is located in
	${country.region} and has population of
	${country.population.toLocaleString('en-us')}. 
  ${languagesTextConvert(country.languages)}. 
	${bordersTextConvert(country.borders)}.`

  return (
    <div className="country-card">
      <div className="country-card__head-container">
        <p className="country-card__common-name">{country.commonName}</p>
        <div className="country-card__favorite">
          {country.favorite ? (
            <MdFavorite
              className="icon country-card__icon"
              onClick={() =>
                dispatch(removeFavoriteCountry(country.commonName))
              }
            />
          ) : (
            <MdOutlineFavoriteBorder
              className="icon country-card__icon"
              onClick={() => dispatch(addFavoriteCountry(country.commonName))}
            />
          )}
        </div>
      </div>
      <p className="country-card__capital">
        {capitalsTextConvert(country.capital)}
      </p>
      <img
        className="country-card__img"
        alt={`${country.commonName} img`}
        src={country.flag}
      />
      <p className="country-card__detail">{detail}</p>
    </div>
  )
}

export default CountryCard
