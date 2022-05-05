import React, { useContext } from 'react'

import { ThemeContext } from '../../context/theme-context'
import { FormProps } from '../../types'
import './form.scss'

const Form = ({ input, inputHandler, inputRef }: FormProps) => {
  const { theme } = useContext(ThemeContext)

  return (
    <form className="form">
      <input
        className={`form__input form__input-${theme}`}
        type="text"
        placeholder="Enter a country name..."
        value={input}
        onChange={inputHandler}
        ref={inputRef}
      ></input>
    </form>
  )
}

export default Form
