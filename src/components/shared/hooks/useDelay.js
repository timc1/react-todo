import { useState, useEffect, useRef } from 'react'

export default ({
  component: componentToRender,
  delayMs = 300,
  shouldCancel,
}) => {
  const [component, setComponent] = useState(null)
  const timeout = useRef()

  useEffect(
    () => {
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        if (shouldCancel === false) {
          setComponent(componentToRender)
        }
      }, delayMs + 100)
    },
    [shouldCancel]
  )

  return { delayedComponent: component }
}
