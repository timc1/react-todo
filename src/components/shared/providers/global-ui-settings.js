import React, { useReducer, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const GlobalUIContext = React.createContext()

const defaultState = () => ({
  type: 'SETUP',
  value: {
    colorTheme: 'dark',
  },
})

const getInitialState = () => {
  if (localStorage.getItem('global_ui')) {
    try {
      return {
        type: 'SETUP',
        value: JSON.parse(localStorage.getItem('global_ui')),
      }
    } catch (error) {
      return defaultState()
    }
  } else {
    return defaultState()
  }
}

export default React.memo(({ children }) => {
  const [state, dispatchUI] = useReducer(reducer, getInitialState())

  useLocalStorage({
    name: 'global_ui',
    objectToUpdate: state.value,
    enableDebounce: true,
    shouldUpdate: true,
  })

  useEffect(
    () => {
      // If the current theme is already dark, don't update anything.
      // Our default CSS is already dark
      updateDOMColors(state.value.colorTheme)
    },
    [state.value.colorTheme]
  )

  return (
    <GlobalUIContext.Provider
      value={{
        state,
        dispatchUI,
      }}
    >
      {children}
    </GlobalUIContext.Provider>
  )
})

const reducer = (state, { type, payload }) => {
  const copy = Object.assign({}, state)
  switch (type.toUpperCase()) {
    case 'SETUP':
      return state
    case 'DARK':
      copy.value = {
        colorTheme: 'dark',
      }
      return copy
    case 'LIGHT':
      copy.value = {
        colorTheme: 'light',
      }
      return copy
    default:
      return state
  }
}

const updateDOMColors = theme => {
  const root = document.documentElement
  let properties
  switch (theme.toUpperCase()) {
    case 'DARK':
      properties = [...baseTheme, ...darkTheme]
      break
    case 'LIGHT':
      properties = [...baseTheme, ...lightTheme]
      break
    default:
  }
  if (properties)
    properties.forEach(i => {
      root.style.setProperty(i.name, i.value)
    })
}

const darkTheme = [
  { name: '--black1', value: 'rgb(0, 0, 0)' },
  { name: '--black2', value: 'rgba(15, 13, 32, 0.99)' },
  { name: '--black4', value: 'rgb(136, 152, 170)' },
  { name: '--white1', value: 'rgb(255, 255, 255)' },
  { name: '--white2', value: 'rgb(221, 225, 228)' },
  { name: '--white3', value: 'rgba(255,255,255,.5)' },
  { name: '--white4', value: 'rgba(255,255,255,.08)' },
  { name: '--white5', value: 'rgb(247, 255, 253)' },
  { name: '--blue1', value: 'rgb(14, 36, 57)' },
  { name: '--blue4', value: 'rgb(14, 17, 19)' },
  { name: '--blue5', value: 'rgb(22, 28, 30)' },
  { name: '--error', value: 'rgb(255, 233, 233)' },
  { name: '--highlighter', value: 'rgb(136, 152, 170)' },
]

const lightTheme = [
  { name: '--black1', value: 'rgb(255, 255, 255)' },
  { name: '--black2', value: 'rgba(15, 13, 32, 0.99)' },
  { name: '--black4', value: 'rgb(136, 152, 170)' },
  { name: '--white1', value: 'rgb(33, 37, 41)' },
  { name: '--white2', value: 'rgb(82, 95, 127)' },
  { name: '--white3', value: 'rgb(246, 249, 252)' },
  { name: '--white4', value: 'rgba(255,255,255,.08)' },
  { name: '--white5', value: 'rgb(0, 230, 148)' },
  { name: '--blue1', value: 'rgb(14, 36, 57)' },
  { name: '--blue4', value: 'rgb(247, 250, 252)' },
  { name: '--blue5', value: 'rgb(22, 28, 30)' },
  { name: '--error', value: 'rgb(255, 162, 123)' },
  { name: '--highlighter', value: 'rgb(0, 0, 0)' },
]

const baseTheme = [
  {
    name: '--basefont',
    value:
      '"Akkurat-Regular", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  },
  {
    name: '--secondaryfont',
    value:
      '"Px-Grotesk", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"',
  },
  { name: '--fontregular', value: '400' },
  { name: '--fontbold', value: '800' },
  { name: '--fontxs', value: '.7rem' },
  { name: '--fontsm', value: '.865rem' },
  { name: '--fontmd', value: '1.25rem' },
  { name: '--fontlg', value: '1.6rem' },
  { name: '--fontxl', value: '2rem' },
  { name: '--screenlg', value: '1440px' },
  { name: '--basepadding', value: '2.5rem' },
  {
    name: '--baseboxshadow',
    value: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  { name: '--baseborderradius', value: '4px' },
  { name: '--cubic', value: 'cubic-bezier(0.645, 0.045, 0.355, 1)' },
  { name: '--cubicbounce', value: 'cubic-bezier(0.74, -0.21, 0.51, 1.39)' },
  { name: 'transition', value: 'all .15s ease-in' },
]
