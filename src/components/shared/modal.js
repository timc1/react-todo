import { useEffect } from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')
const el = document.createElement('div')
el.style = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #eee;
  z-index: 9;
  opacity: 0;
  transition: opacity .15s ease-in;
`

const handleKeyDown = (e, toggleModal) => {
  if (e.key.toUpperCase() === 'ESCAPE') {
    toggleModal()
  }
}

let eventListener

export default ({ isShowing, toggleModal, children }) => {
  useEffect(() => {
    modalRoot.appendChild(el)
    eventListener = e => handleKeyDown(e, toggleModal)
    return () => {
      modalRoot.removeChild(el)
      document.removeEventListener('keydown', eventListener)
    }
  }, [])

  useEffect(
    () => {
      if (isShowing) {
        el.style.opacity = 1
        el.style.pointerEvents = 'initial'
        document.addEventListener('keydown', eventListener)
      } else {
        el.style.opacity = 0
        el.style.pointerEvents = 'none'
        document.removeEventListener('keydown', eventListener)
      }
    },
    [isShowing]
  )

  return ReactDOM.createPortal(children, el)
}
