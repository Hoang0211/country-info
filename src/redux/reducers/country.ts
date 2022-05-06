import {
  CountryState,
  CountryActions,
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
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
      const allCountries = action.payload.data.map((country) => ({
        commonName: country.name.common,
        officialName: country.name.official,
        capital: country.capital,
        flag: country.flags.png,
        population: country.population,
        languages: country.languages,
        borders: country.borders,
        region: country.region,
        favorite: false,
      }))

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
    default:
      return state
  }
}
