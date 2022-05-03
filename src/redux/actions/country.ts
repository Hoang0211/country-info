import { Dispatch } from 'redux'
import axios from 'axios'

import {
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
  CountryActions,
  Country,
  isAxiosError,
} from '../../types'

export function getCountryRequest(): CountryActions {
  return {
    type: GET_COUNTRY_REQUEST,
  }
}

export function getCountrySuccess(allCountries: Country[]): CountryActions {
  return {
    type: GET_COUNTRY_SUCCESS,
    payload: {
      allCountries,
    },
  }
}

export function getCountryFailure(errorMsg: string): CountryActions {
  return {
    type: GET_COUNTRY_FAILURE,
    payload: {
      errorMsg,
    },
  }
}

export function fetchCountry() {
  return async (dispatch: Dispatch) => {
    dispatch(getCountryRequest())
    try {
      const res = await axios.get('https://restcountries.com/v3.1/all')
      const data = await res.data
      return dispatch(getCountrySuccess(data))
    } catch (err) {
      if (isAxiosError(err)) {
        return dispatch(getCountryFailure(err.message))
      }
    }
  }
}
