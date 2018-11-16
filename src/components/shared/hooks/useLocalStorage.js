import { useEffect } from 'react'
import { debounce } from '../../../utils'

let debouncedObj
export default ({ name, objectToUpdate, enableDebounce }) => {
  useEffect(
    () => {
      if (enableDebounce) {
        if (debouncedObj) debouncedObj.clear()
        debouncedObj = debounce(updateLocalStorage, 1000)
        debouncedObj()
      } else {
        updateLocalStorage()
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
