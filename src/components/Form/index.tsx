import React, { useContext } from 'react'

import { ThemeContext } from '../../context/theme-context'
import './form.scss'

const Form = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <form className="form">
      <input
        className={`form__input form__input-${theme}`}
        type="text"
        placeholder="Enter a country name..."
      ></input>
    </form>
  )
}

export default Form
