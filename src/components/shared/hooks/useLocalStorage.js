import { useEffect, useRef } from 'react'
import { debounce } from '../../../utils'

//let debouncedObj
export default ({ name, objectToUpdate, enableDebounce, shouldUpdate }) => {
  let debouncedObj = useRef()

  useEffect(
    () => {
      if (shouldUpdate) {
        if (enableDebounce) {
          if (debouncedObj.current) debouncedObj.current.clear()
          debouncedObj.current = debounce(updateLocalStorage, 1000)
          debouncedObj.current()
        } else {
          updateLocalStorage()
        }
      }
    },
    [JSON.stringify(objectToUpdate)]
  )

  const updateLocalStorage = () => {
    const current = localStorage.getItem(name)
    const updated = JSON.stringify(objectToUpdate)
    if (current !== updated) {
      localStorage.setItem(name, updated)
    }
  }
}
