import React, { useState, useRef } from 'react'
import styled from 'react-emotion'
import { PlainButton } from '../styles'
import { Loader } from '../icons'

import { http, API_URL } from '../../../utils'
import useUser from '../hooks/useUser'
import useOuterClick from '../hooks/useOuterClick'

export default ({ isShowing, toggleUserMenu }) => {
  const popupRef = useRef()
  const [isSigningOut, setSignout] = useState(false)
  const { userContext } = useUser()

  useOuterClick({
    ref: popupRef,
    isShowing,
    toggle: toggleUserMenu,
  })

  return (
    <Container isShowing={isShowing} innerRef={popupRef} role="listbox">
      <li>
        <PlainButton
          tabIndex={isShowing ? '0' : '-1'}
          onClick={e => {
            setSignout(true)
            handleSignout({
              event: e,
              onSuccess: () => {
                setSignout(false)
                toggleUserMenu(false)
                userContext.setUser({
                  ...userContext.state,
                  user: null,
                })
              },
              onError: error => {
                console.log('error', error)
              },
            })
          }}
        >
          Sign out
        </PlainButton>
        <div className="loader">
          <Loader isShowing={isSigningOut} />
        </div>
      </li>
    </Container>
  )
}

const handleSignout = ({ event, onSuccess, onError }) => {
  const url = API_URL + '/v0/auth'
  http.delete(url).then(({ error, deleted }) => {
    if (deleted) {
      onSuccess()
      return
    }
    onError(error)
  })
}

const Container = styled.ul`
  background: var(--black1);
  border: 2px solid var(--white3);
  border-radius: var(--baseborderradius);
  box-shadow: 0 0 12px var(--black4);
  position: absolute;
  top: 45px;
  right: 0;
  width: 180px;
  transform: ${props =>
    props.isShowing ? 'scale(1) translateY(0)' : 'scale(0.7) translateY(-5px)'};
  opacity: ${props => (props.isShowing ? 1 : 0)};
  transition-property: transform, opacity;
  transition: 0.25s var(--cubicbounce);
  transform-origin: 100% 0;
  pointer-events: ${props => (props.isShowing ? 'initial' : 'none')};
  z-index: 3;

  li {
    position: relative;
  }

  .loader {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }

  button,
  a {
    padding: 10px;
    width: 100%;
  }
`
