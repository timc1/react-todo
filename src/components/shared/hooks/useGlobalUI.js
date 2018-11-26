import { useContext } from 'react'
import { GlobalUIContext } from '../providers/global-ui-settings'

export default () => {
  const uiContext = useContext(GlobalUIContext)

  return { uiContext }
}
