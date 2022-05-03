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
      return {
        ...state,
        isLoading: false,
        allCountries: action.payload.allCountries,
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
