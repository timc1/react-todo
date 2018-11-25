import React, { useReducer, useEffect } from 'react'

export const NotificationContext = React.createContext()

const getInitialState = () => {
  return {
    type: 'SETUP',
    value: localStorage.getItem('global_ui'),
  }
}

export default React.memo(({ children }) => {
  const [state, dispatchUI] = useReducer(reducer, getInitialState())

  useEffect(() => {
    updateDOMColors(state.type)
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        state,
        dispatchUI,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
})

const reducer = (state, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}

const updateDOMColors = () => {
  console.log('updateDOMColors')
}
