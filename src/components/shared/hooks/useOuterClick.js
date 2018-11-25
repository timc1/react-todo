import { useEffect, useRef } from 'react'

const clickEvent =
  'ontouchstart' in document.documentElement === true ? 'touchstart' : 'click'

export default ({ ref, isShowing, toggle }) => {
  const eventListener = useRef()

  useEffect(() => {
    eventListener.current = e => handleOuterClick(e, ref, toggle)
  }, [])

  useEffect(
    () => {
      if (isShowing)
        document.addEventListener(clickEvent, eventListener.current)
      else document.removeEventListener(clickEvent, eventListener.current)
      return () =>
        document.removeEventListener(clickEvent, eventListener.current)
    },
    [isShowing]
  )
}

const handleOuterClick = (e, ref, toggle) => {
  if (!ref.current.contains(e.target)) {
    toggle(false)
  }
}
