import React, { useState, lazy, Suspense } from 'react'
import styled from 'react-emotion'

import { PlainButton, PlainLinkInternal, fadein, screenSm } from './styles'
import { Logo } from './icons'
import caretSvg from '../../images/caret.svg'

const Auth = lazy(() => import('./auth/index'))
const UserMenu = lazy(() => import('./auth/user-menu'))

export default ({ user }) => {
  const [isAuthShowing, toggleAuth] = useState(false)
  const [isUserMenuShowing, toggleUserMenu] = useState(false)

  return (
    <Header>
      <Nav>
        <ul className="nav">
          <li>
            <PlainLinkInternal className="logo-container" to="/" nocolor="true">
              <Logo />
              <h1 className="logo-title">todoHQ</h1>
            </PlainLinkInternal>
          </li>
          {user ? (
            <li>
              <UserButton
                style={{
                  fontSize: 'var(--fontsm)',
                  textTransform: 'uppercase',
                  padding: '10px 5px',
                }}
                onClick={e => toggleUserMenu(!isUserMenuShowing)}
                showCarat
                isOpen={isUserMenuShowing}
              >
                <span>{user.general.first_name}</span>
              </UserButton>
              <Suspense delayMs={300} fallback={<div />}>
                <UserMenu
                  isShowing={isUserMenuShowing}
                  toggleUserMenu={toggleUserMenu}
                />
              </Suspense>
            </li>
          ) : (
            <li>
              <UserButton
                style={{
                  fontSize: 'var(--fontsm)',
                  textTransform: 'uppercase',
                  padding: '10px 5px',
                }}
                onClick={e => toggleAuth(!isAuthShowing)}
              >
                <span>Login</span>
              </UserButton>
              <Suspense delayMs={300} fallback={<div />}>
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
  > ul.nav {
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
  > ul.nav > li {
    position: relative;
    display: inline-block;
    color: var(--white1);
    font-size: var(--fontsm);
    animation: ${fadein} 0.15s ease-in;
  }

  > ul.nav > li:first-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .logo-container {
      display: grid;
      grid-auto-flow: column;
      align-items: end;
      grid-gap: var(--fontxs);
      padding: 10px 5px;
      &:active > .logo {
        transform: scale(0.95);
      }
    }
    .logo {
      height: var(--fontlg);
      width: var(--fontlg);
      transform: scale(1);
      transition: transform 0.15s linear;
    }
    .logo-title {
      font-family: var(--secondaryfont);
      font-size: var(--fontmd);
      margin: 0;
    }
    @media (max-width: ${screenSm}px) {
      .logo-title {
        display: none;
      }
    }
  }

  > ul.nav > li:nth-child(2) {
    text-transform: uppercase;
  }
`

const UserButton = styled(PlainButton)`
  opacity: 0;
  animation: ${fadein} 0.25s ease-in;
  animation-fill-mode: forwards;
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
    &::before {
      transform: ${props =>
        props.isOpen ? 'rotate(180deg) scale(.8)' : 'rotate(0) scale(.8)'};
    }
  }
  &::before {
    content: '';
    display: ${props => (props.showCarat ? 'inline-block' : 'none')};
    vertical-align: middle;
    margin-right: 5px;
    height: var(--fontxs);
    width: var(--fontxs);
    background: var(--white1);
    mask: url(${caretSvg}) center / contain no-repeat;
    transform: ${props =>
      props.isOpen ? 'rotate(180deg) scale(1)' : 'rotate(0) scale(1)'};
    transition: transform 0.15s ease-in;
  }
`
