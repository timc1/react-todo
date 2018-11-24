import React, { useReducer, useEffect } from 'react'

export const UIContext = React.createContext()

const initialState = {
  type: null,
  value: null,
}

export default React.memo(({ children }) => {
  const [state, dispatchUI] = useReducer(reducer, initialState)
  const { userContext } = useUser()

  useEffect(() => {
    console.log('hiii')
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
