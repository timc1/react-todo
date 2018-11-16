import React, { useContext } from 'react'
import { UserContext } from '../providers/user'

export default () => {
  const userContext = useContext(UserContext)

  return {
    userContext,
  }
}
