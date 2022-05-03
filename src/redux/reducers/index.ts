import { combineReducers } from 'redux'

import country from './country'

const createRootReducer = () =>
  combineReducers({
    country,
  })

export default createRootReducer
