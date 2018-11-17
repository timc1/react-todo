import React, { useState, useEffect } from 'react'

export const UserContext = React.createContext()

export default ({ children }) => {
  const [state, setUser] = useState({
    user: null,
    isSettingUp: true,
  })

  //API call here to get current user.
  useEffect(() => {
    setTimeout(() => {
      setUser({ user: null, isSettingUp: false })
    }, 200)
  }, [])

  return (
    <UserContext.Provider
      value={{
        state,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
