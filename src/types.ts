import { AxiosError } from 'axios'

// Action types
export const GET_COUNTRY_REQUEST = 'GET_COUNTRY'
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS'
export const GET_COUNTRY_FAILURE = 'GET_COUNTRY_FAILURE'
export const ADD_FAVORITE_COUNTRY = 'ADD_FAVORITE_COUNTRY'
export const REMOVE_FAVORITE_COUNTRY = 'REMOVE_FAVORITE_COUNTRY'
export const TOGGLE_MODAL = 'TOGGLE_MODAL'

// Enum
export enum Theme {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Purple = 'purple',
}

// A modal
export type ModalAction = {
  type: typeof TOGGLE_MODAL
}

// A country
export type Country = {
  commonName: string
  officialName: string
  capital: string[]
  flag: string
  population: number
  languages: object
  borders: string[]
  region: string
  favorite: boolean
}

export type GetCountryRequestAction = {
  type: typeof GET_COUNTRY_REQUEST
}

export type GetCountrySuccessAction = {
  type: typeof GET_COUNTRY_SUCCESS
  payload: {
    data: any[]
  }
}

export type GetCountryFailureAction = {
  type: typeof GET_COUNTRY_FAILURE
  payload: {
    errorMsg: string
  }
}

export type AddFavoriteCountryAction = {
  type: typeof ADD_FAVORITE_COUNTRY
  payload: {
    countryName: string
  }
}

export type RemoveFavoriteCountryAction = {
  type: typeof REMOVE_FAVORITE_COUNTRY
  payload: {
    countryName: string
  }
}

// For reducer
export type ModalState = {
  showModal: boolean
}

export type CountryState = {
  isLoading: boolean
  error: string
  allCountries: Country[]
  favoriteCountries: Country[]
}

export type CountryActions =
  | GetCountryRequestAction
  | GetCountrySuccessAction
  | GetCountryFailureAction
  | AddFavoriteCountryAction
  | RemoveFavoriteCountryAction

export type AppState = {
  country: CountryState
  modal: ModalState
}

// Type guard
export function isAxiosError(candidate: any): candidate is AxiosError {
  return candidate.isAxiosError === true
}

// Props
export type CountryProps = {
  country: Country
}
