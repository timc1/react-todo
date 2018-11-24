import React, { useReducer, useEffect } from 'react'
import useUser from '../hooks/useUser'

export const NotificationContext = React.createContext()

const initialState = {
  type: null,
  value: false,
}

export default React.memo(({ children }) => {
  const [state, dispatchNotification] = useReducer(reducer, initialState)
  const { userContext } = useUser()

  useEffect(
    () => {
      if (!userContext.state.user) {
        dispatchNotification({
          type: 'RESET',
        })
      }
    },
    [JSON.stringify(userContext.state.user)]
  )

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
      return {
        ...state,
        type,
        value: payload,
      }
    case 'RESET':
      return initialState
    case 'CLOSE_POPUP':
      return {
        ...state,
        type: null,
      }
    default:
      return state
  }
}
