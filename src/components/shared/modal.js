import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { ExitButton } from './styles'
import { Exit as ExitIcon } from './icons'

const modalRoot = document.getElementById('modal-root')
const el = document.createElement('div')
el.style = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--black1);
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
  const initialFocusRef = useRef()
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
        initialFocusRef.current.focus()
      } else {
        el.style.opacity = 0
        el.style.pointerEvents = 'none'
        document.removeEventListener('keydown', eventListener)
      }
    },
    [isShowing]
  )

  return ReactDOM.createPortal(
    <>
      <ExitButton innerRef={initialFocusRef} onClick={e => toggleModal()}>
        <ExitIcon />
        <span className="screen-reader">Exit modal</span>
      </ExitButton>
      {children}
    </>,
    el
  )
}
