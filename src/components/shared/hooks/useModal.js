import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { ExitButton } from '../styles'
import { Exit as ExitIcon } from '../icons'

const root = document.getElementById('root')

export default ({ domElement, toggleModal, isShowing }) => {
  const base = useRef()
  const modalRoot = useRef()
  const eventListener = useRef()
  const initialFocusRef = useRef()
  const currentScrollPosition = useRef()

  useEffect(() => {
    base.current = document.createElement('div')
    base.current.style = `
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

    modalRoot.current = document.getElementById(domElement)
    eventListener.current = e => handleKeyDown(e, toggleModal)
    return () => {
      toggleModal(false)
      modalRoot.current.removeChild(base.current)
      document.removeEventListener('keydown', eventListener.current)
    }
  }, [])

  useEffect(
    () => {
      if (isShowing) {
        if (base.current) {
          modalRoot.current.appendChild(base.current)
          base.current.style.opacity = 1
          base.current.style.pointerEvents = 'initial'

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
        }
      } else {
        base.current.style.opacity = 0
        base.current.style.pointerEvents = 'none'

        setTimeout(() => {
          if (modalRoot.current.contains(base.current))
            modalRoot.current.removeChild(base.current)
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

  const renderModal = ({ render }) =>
    base.current
      ? ReactDOM.createPortal(
          <>
            <ExitButton
              innerRef={initialFocusRef}
              onClick={e => toggleModal()}
              tabIndex={isShowing ? '0' : '-1'}
            >
              <ExitIcon />
              <span className="screen-reader">Exit modal</span>
            </ExitButton>
            {render}
          </>,
          base.current
        )
      : null

  return {
    Modal: renderModal,
  }
}

const handleKeyDown = (e, toggleModal) => {
  if (e.key?.toUpperCase() === 'ESCAPE') {
    toggleModal()
  }
}
