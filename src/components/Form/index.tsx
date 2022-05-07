import React, { useContext } from 'react'

import { ThemeContext } from '../../context/theme-context'
import './form.scss'

export type FormProps = {
  input: string
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputRef: React.RefObject<HTMLInputElement>
}

const Form = ({ input, inputHandler, inputRef }: FormProps) => {
  const { theme } = useContext(ThemeContext)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form className="form" onSubmit={submitHandler}>
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
