import React, { useState, useEffect } from 'react'
import { http, API_URL } from '../../../utils'
import { User as formatUser } from '../../../models/user'

export const UserContext = React.createContext()

export default ({ children }) => {
  const [state, setUser] = useState({
    user: null,
    isSettingUp: true,
  })

  //API call here to get current user.
  useEffect(() => {
    http.get(`${API_URL}/v0/auth`).then(({ error, user }) => {
      if (error) setUser({ user: null, isSettingUp: false })
      else setUser({ user: formatUser(user), isSettingUp: false })
    })
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
