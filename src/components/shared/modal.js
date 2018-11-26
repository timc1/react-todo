import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { ExitButton } from './styles'
import { Exit as ExitIcon } from './icons'

const root = document.getElementById('root')
const modalRoot = document.getElementById('modal-root')
const el = document.createElement('div')
el.style = `
  position: fixed;
  height: 100%; 
  width: 100%;
  background: var(--black1);
  z-index: 9;
  opacity: 0;
  transition: opacity .15s ease-in;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
`

const handleKeyDown = (e, toggleModal) => {
  if (e.key?.toUpperCase() === 'ESCAPE') {
    toggleModal()
  }
}

export default ({ isShowing, toggleModal, children }) => {
  const initialFocusRef = useRef()
  const eventListener = useRef()
  const currentScrollPosition = useRef()

  useEffect(() => {
    modalRoot.appendChild(el)
    eventListener.current = e => handleKeyDown(e, toggleModal)
    return () => {
      toggleModal(false)
      modalRoot.removeChild(el)
      document.removeEventListener('keydown', eventListener.current)
    }
  }, [])

  useEffect(
    () => {
      if (isShowing) {
        modalRoot.appendChild(el)
        el.style.opacity = 1
        el.style.pointerEvents = 'initial'

        document.addEventListener('keydown', eventListener.current)

        initialFocusRef.current.focus()
        // Freeze root content div
        currentScrollPosition.current = window.scrollY
        root.style = `
          position: fixed;
          top: -${currentScrollPosition.current}px;
          width: 100%;
          overflow: hidden; 
          pointer-events: none;
        `
      } else {
        el.style.opacity = 0
        el.style.pointerEvents = 'none'

        setTimeout(() => {
          if (modalRoot.contains(el)) modalRoot.removeChild(el)
        }, 250)

        document.removeEventListener('keydown', eventListener.current)
        // Unfreeze root content div
        root.style = `width: 100%`
        window.scrollTo({ top: currentScrollPosition.current })
      }
      return () => {
        // Unfreeze root content div
        root.style = `width: 100%`
        window.scrollTo({ top: currentScrollPosition.current })
      }
    },
    [isShowing]
  )

  return ReactDOM.createPortal(
    <>
      <ExitButton
        innerRef={initialFocusRef}
        onClick={e => toggleModal()}
        tabIndex={isShowing ? '0' : '-1'}
      >
        <ExitIcon />
        <span className="screen-reader">Exit modal</span>
      </ExitButton>
      {children}
    </>,
    el
  )
}
