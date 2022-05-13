import { combineReducers } from 'redux'

import country from './country'
import modal from './modal'

const createRootReducer = () =>
  combineReducers({
    country,
    modal,
  })

export default createRootReducer
