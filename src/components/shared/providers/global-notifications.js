import React, { useReducer } from 'react'

export const NotificationContext = React.createContext()

export default React.memo(({ children }) => {
  const [state, dispatchNotification] = useReducer(reducer, {
    type: null,
    value: false,
  })

  return (
    <NotificationContext.Provider
      value={{
        state,
        dispatchNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
})

const reducer = (state, { type, payload }) => {
  console.log('type', type)
  console.log('payload', payload)
  switch (type) {
    case 'ERROR':
      return state
    default:
      return state
  }
}
