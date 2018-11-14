import { useEffect } from 'react'
import { debounce, getLocale } from '../../../utils'

let debouncedObj
export default (
  { name, objectToUpdate },
  delimiters = [JSON.stringify(objectToUpdate)]
) => {
  useEffect(() => {
    if (objectToUpdate) {
      if (debouncedObj) debouncedObj.clear()
      debouncedObj = debounce(updateLocalStorage, 1500)
      debouncedObj()
    }
  }, delimiters)

  const updateLocalStorage = () => {
    const current = localStorage.getItem(name)
    const updated = JSON.stringify(objectToUpdate)

    if (current !== updated) {
      localStorage.setItem(name, updated)
      let date = new Date()
      return {
        lastUpdated: date.toLocaleString(getLocale()),
      }
    }
  }
}
