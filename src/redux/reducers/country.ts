import {
  CountryState,
  CountryActions,
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
  ADD_FAVORITE_COUNTRY,
  REMOVE_FAVORITE_COUNTRY,
} from '../../types'

export default function country(
  state: CountryState = {
    isLoading: false,
    error: '',
    allCountries: [],
    favoriteCountries: [],
  },
  action: CountryActions
): CountryState {
  switch (action.type) {
    case GET_COUNTRY_REQUEST: {
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    }
    case GET_COUNTRY_SUCCESS: {
      const allCountries = action.payload.data.map((country) => {
        if (country.capital === undefined) {
          return {
            commonName: country.name.common,
            officialName: country.name.official,
            capital: ['N/A'],
            flag: country.flags.png,
            population: country.population,
            languages: country.languages,
            borders: country.borders,
            region: country.region,
            favorite: false,
          }
        } else {
          return {
            commonName: country.name.common,
            officialName: country.name.official,
            capital: country.capital,
            flag: country.flags.png,
            population: country.population,
            languages: country.languages,
            borders: country.borders,
            region: country.region,
            favorite: false,
          }
        }
      })

      return {
        ...state,
        isLoading: false,
        allCountries: allCountries,
      }
    }
    case GET_COUNTRY_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.errorMsg,
      }
    }
    case ADD_FAVORITE_COUNTRY: {
      // Deep clone allCountries state and update it
      const clonedAllCountries = state.allCountries.map((country) => {
        if (country.commonName === action.payload.countryName) {
          country.favorite = !country.favorite
        }
        return country
      })

      // Deep clone favoriteCountries state and update it
      const clonedFavCountries = state.favoriteCountries.map(
        (country) => country
      )
      const addedCountry = clonedAllCountries.find(
        (country) => country.commonName === action.payload.countryName
      )
      if (addedCountry) {
        clonedFavCountries.push(addedCountry)
      }

      return {
        ...state,
        allCountries: clonedAllCountries,
        favoriteCountries: clonedFavCountries,
      }
    }
    case REMOVE_FAVORITE_COUNTRY: {
      // Deep clone allCountries state and update it
      const clonedAllCountries = state.allCountries.map((country) => {
        if (country.commonName === action.payload.countryName) {
          country.favorite = !country.favorite
        }
        return country
      })

      // Deep clone favoriteCountries state and update it
      const clonedFavCountries = state.favoriteCountries.filter(
        (country) => country.commonName !== action.payload.countryName
      )

      return {
        ...state,
        allCountries: clonedAllCountries,
        favoriteCountries: clonedFavCountries,
      }
    }
    default:
      return state
  }
}
