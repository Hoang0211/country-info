import { AxiosError } from 'axios'

// Action types
export const GET_COUNTRY_REQUEST = 'GET_COUNTRY'
export const GET_COUNTRY_SUCCESS = 'GET_COUNTRY_SUCCESS'
export const GET_COUNTRY_FAILURE = 'GET_COUNTRY_FAILURE'

// Enum
export enum Theme {
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
  Purple = 'purple',
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
  continents: string[]
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

// For reducer
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

export type AppState = {
  country: CountryState
}

// Type guard
export function isAxiosError(candidate: any): candidate is AxiosError {
  return candidate.isAxiosError === true
}

// Props
export type CountryProps = {
  country: Country
}
