import React, { useState } from 'react'

export const UserContext = React.createContext()

export default ({ children }) => {
  const [user, setUser] = useState('hi')

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
