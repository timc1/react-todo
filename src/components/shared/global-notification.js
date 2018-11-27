import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import styled from 'react-emotion'
import useGlobalNotification from './hooks/useGlobalNotification'
import { screenSm, ExitButton } from './styles'
import { Exit as ExitIcon } from './icons'

const notificationRoot = document.getElementById('notification-root')
const el = document.createElement('div')

export default React.memo(() => {
  const { notificationContext: context } = useGlobalNotification()
  const focusButtonRef = useRef()

  useEffect(() => {
    notificationRoot.appendChild(el)
    return () => notificationRoot.removeChild(el)
  }, [])

  useEffect(
    () => {
      if (context.state.type !== null) {
        focusButtonRef.current.focus()
      }
    },
    [context.state.type, context.state.value]
  )

  return ReactDOM.createPortal(
    <Container isShowing={context.state.type !== null}>
      <ExitButton
        onClick={e => context.dispatchNotification({ type: 'CLOSE_POPUP' })}
        innerRef={focusButtonRef}
        tabIndex={context.state.type !== null ? '0' : '-1'}
        style={{
          margin: 0,
          position: 'absolute',
          top: '-40px',
          right: 0,
        }}
      >
        <ExitIcon />
        <span className="screen-reader">Toggle to exit notification popup</span>
      </ExitButton>
      <p className="notification-message">{context.state.value}</p>
    </Container>,
    el
  )
})

const Container = styled.div`
  position: fixed;
  bottom: 40px;
  left: 40px;
  max-width: 320px;
  padding: 10px;
  background: var(--black1);
  border: 2px solid var(--white1);
  border-radius: var(--baseborderradius);
  box-shadow: 0 0 12px var(--black4);
  opacity: ${props => (props.isShowing ? 1 : 0)};
  transform: ${props => (props.isShowing ? 'scale(1)' : 'scale(0)')};
  transform-origin: 0;
  transition-property: opacity, transform;
  transition: 0.25s var(--cubic);
  pointer-events: ${props => (props.isShowing ? 'initial' : 'none')};
  z-index: 99;
  p {
    margin: 0;
  }
  > .notification-message {
    font-size: var(--fontsm);
    font-family: var(--secondaryfont);
    color: var(--white1);
  }

  @media (max-width: ${screenSm}px) {
    max-width: unset;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0;
    transform: ${props =>
      props.isShowing ? 'translateY(0)' : 'translateY(100%)'};
  }
`
