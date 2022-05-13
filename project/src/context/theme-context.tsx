import React, { useState, createContext } from 'react'

import { Theme } from '../types'

type ThemeContextType = {
  theme: Theme
  changeTheme: (newTheme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: Theme.Blue,
  changeTheme: () => {},
})

const ThemeProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Blue)

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
