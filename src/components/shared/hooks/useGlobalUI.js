import { useContext } from 'react'
import { NotificationContext } from '../providers/global-ui-settings'

export default () => {
  const notificationContext = useContext(NotificationContext)

  return { notificationContext }
}
