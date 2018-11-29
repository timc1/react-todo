import { useEffect } from 'react'

export default ({ children, location }) => {
  useEffect(
    () => {
      if (window.ga) {
        window.ga('set', 'page', location)
        window.ga('send', 'pageview')
      }
    },
    [location.pathname]
  )

  return children
}
