import { useEffect } from 'react'
import { debounce } from '../../../utils'

let debouncedObj
export default ({ name, objectToUpdate }) => {
  useEffect(
    () => {
      if (debouncedObj) debouncedObj.clear()
      debouncedObj = debounce(updateLocalStorage, 3000)
      debouncedObj()
    },
    [objectToUpdate]
  )

  const updateLocalStorage = () => {
    const current = localStorage.getItem(name)
    const updated = JSON.stringify(objectToUpdate)
    if (current !== updated) {
      localStorage.setItem(name, updated)
    }
  }
}
