import { useContext } from 'react'
import { NotificationContext } from '../providers/global-notifications'

export default () => {
  const context = useContext(NotificationContext)

  return {
    notificationContext: context,
  }
}
