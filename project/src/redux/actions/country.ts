import { Dispatch } from 'redux'
import axios from 'axios'

import {
  GET_COUNTRY_REQUEST,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
  CountryActions,
  isAxiosError,
  ADD_FAVORITE_COUNTRY,
  REMOVE_FAVORITE_COUNTRY,
} from '../../types'

export function getCountryRequest(): CountryActions {
  return {
    type: GET_COUNTRY_REQUEST,
  }
}

export function getCountrySuccess(data: any[]): CountryActions {
  return {
    type: GET_COUNTRY_SUCCESS,
    payload: {
      data,
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

export function addFavoriteCountry(countryName: string): CountryActions {
  return {
    type: ADD_FAVORITE_COUNTRY,
    payload: {
      countryName,
    },
  }
}

export function removeFavoriteCountry(countryName: string): CountryActions {
  return {
    type: REMOVE_FAVORITE_COUNTRY,
    payload: {
      countryName,
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
