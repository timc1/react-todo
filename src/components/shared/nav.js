import React, { useState, lazy, Suspense } from 'react'
import styled from 'react-emotion'

import { PlainButton } from './styles'

const Auth = lazy(() => import('./auth'))

export default ({ user }) => {
  const [isAuthShowing, toggleAuth] = useState(false)
  return (
    <Header>
      <Nav>
        <ul>
          <li>TODO</li>
          {user ? (
            <li>User</li>
          ) : (
            <li>
              <LoginButton
                style={{
                  fontSize: 'var(--fontsm)',
                  textTransform: 'uppercase',
                  padding: '10px 0',
                }}
                onClick={e => toggleAuth(!isAuthShowing)}
              >
                <span>Login</span>
              </LoginButton>
              <Suspense fallback={<div>Loading...</div>}>
                <Auth isShowing={isAuthShowing} toggleAuth={toggleAuth} />
              </Suspense>
            </li>
          )}
        </ul>
      </Nav>
    </Header>
  )
}

const Header = styled('header')``

const Nav = styled('nav')`
  ul {
    position: relative;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    justify-content: end;
    align-items: center;
    grid-gap: 0.625rem;
    height: 6.25rem;
    padding: 0 0.9375rem;
  }
  li {
    position: relative;
    display: inline-block;
    color: var(--white1);
    font-size: var(--fontsm);
  }

  li:first-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  li:nth-child(2) {
    text-transform: uppercase;
  }
`

const LoginButton = styled(PlainButton)`
  > span {
    transition: opacity 0.15s ease-in;
    opacity: 0.7;
  }
  &:hover,
  &:focus {
    > span {
      opacity: 1;
    }
  }
  &:active {
    > span {
      opacity: 0.7;
    }
  }
`