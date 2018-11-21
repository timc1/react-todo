import { useEffect } from 'react'

let eventListener
const clickEvent =
  'ontouchstart' in document.documentElement === true ? 'touchstart' : 'click'

export default ({ ref, isShowing, toggle }) => {
  useEffect(() => {
    eventListener = e => handleOuterClick(e, ref, toggle)
  }, [])
  useEffect(
    () => {
      if (isShowing) document.addEventListener(clickEvent, eventListener)
      else document.removeEventListener(clickEvent, eventListener)
      return () => document.removeEventListener(clickEvent, eventListener)
    },
    [isShowing]
  )
}

const handleOuterClick = (e, ref, toggle) => {
  if (!ref.current.contains(e.target)) {
    toggle(false)
  }
}
