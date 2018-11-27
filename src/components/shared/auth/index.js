import React, { useReducer } from 'react'
import styled from 'react-emotion'

import { Login as LoginForm, Signup as SignupForm } from './auth-forms'

import { PlainButton } from '../styles'
import {
  Facebook as FBIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
} from '../icons'
import { screenSm, screenMd } from '../styles'
import arrowRight from '../../../images/arrow-right.svg'

import Modal from '../modal'

import useGlobalNotification from '../hooks/useGlobalNotification'
import useUser from '../hooks/useUser'
import { User as formatUser } from '../../../models/user'

import { handleFacebookLogin } from './lib/social-auth'

const initialState = {
  isEmailFormShowing: false,
  isSignup: false,
  isLoading: false,
}

const reducer = (state, action) => {
  if (!state.isAuthorizing) {
    switch (action.type) {
      case 'RESET':
        return initialState
      case 'TOGGLE_EMAIL_FORM':
        return {
          ...state,
          isEmailFormShowing: true,
          ...action.payload,
        }
      case 'SUBMIT_FORM':
        return {
          ...state,
          isLoading: true,
        }
      case 'SOCIAL_LOGIN':
        return {
          ...state,
          isLoading: true,
        }
      case 'ERRORED':
        return {
          ...state,
          isLoading: false,
        }
      default:
        return state
    }
  }
  return state
}

export default React.memo(
  ({ isShowing: isModalShowing, toggleAuth }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const { userContext } = useUser()
    const { notificationContext } = useGlobalNotification()

    return (
      <Modal
        domElement="modal-root"
        isShowing={isModalShowing}
        toggleModal={toggleAuth}
      >
        <Container isShowing={isModalShowing}>
          <ul>
            <li>
              <Button
                disabled={state.isLoading}
                onClick={e => {
                  dispatch({
                    type: 'SOCIAL_LOGIN',
                  })
                  handleFacebookLogin(e, {
                    onSuccess: user => {
                      userContext.setUser({
                        ...userContext.state,
                        user: formatUser(user),
                      })
                    },
                    onError: error => {
                      dispatch({
                        type: 'ERRORED',
                      })
                      notificationContext.dispatchNotification({
                        type: 'ERROR',
                        payload: error,
                      })
                    },
                  })
                }}
                tabIndex={isModalShowing ? '0' : '-1'}
              >
                <FBIcon />
                <span>Continue with Facebook</span>
              </Button>
            </li>
            <li>
              <Button
                disabled={state.isLoading}
                tabIndex={isModalShowing ? '0' : '-1'}
              >
                <TwitterIcon />
                <span>Continue with Twitter</span>
              </Button>
            </li>
            <li>
              <Button
                onClick={e => {
                  dispatch({
                    type: 'TOGGLE_EMAIL_FORM',
                    payload: {
                      isSignup: false,
                    },
                  })
                }}
                disabled={state.isLoading}
                tabIndex={isModalShowing ? '0' : '-1'}
              >
                <EmailIcon />
                <span>Continue with Email</span>
              </Button>
            </li>
            <li>
              {state.isEmailFormShowing ? (
                state.isSignup ? (
                  <SignupForm
                    disabled={state.isLoading}
                    dispatch={dispatch}
                    isModalShowing={isModalShowing}
                    error={state.error}
                  />
                ) : (
                  <LoginForm
                    disabled={state.isLoading}
                    dispatch={dispatch}
                    isModalShowing={isModalShowing}
                    error={state.error}
                  />
                )
              ) : null}
            </li>
          </ul>
        </Container>
      </Modal>
    )
  },
  (prevProps, nextProps) => prevProps.isShowing === nextProps.isShowing
)

const Container = styled.div`
  position: absolute;
  top: 100px;
  padding: 30px;
  padding: 30px;
  opacity: ${props => (props.isShowing ? 1 : 0)};
  transition: opacity 0.15s ease-in;
  transition-delay: 0.25s;

  ul {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1.5fr;
    grid-gap: 10px;
  }
  li {
    grid-column: 1;
  }
  li:last-child {
    grid-column: 2;
    grid-row: 3;
  }

  @media (max-width: ${screenMd}px) {
    width: 500px;
    ul {
      grid-template-columns: 1fr;
    }
    li:last-child {
      grid-column: initial;
      grid-row: initial;
    }
  }

  @media (max-width: ${screenSm}px) {
    width: 100%;
  }
`

const Button = React.memo(
  styled(PlainButton)`
    display: flex;
    align-items: end;
    font-size: var(--fontsm);
    padding: 10px;
    .icon,
    span {
      opacity: 0.7;
      transition: opacity 0.15s ease-in;
    }
    .icon {
      height: var(--fontsm);
      width: var(--fontsm);
    }
    span {
      font-family: var(--secondaryfont);
      font-weight: var(--fontbold);
      padding-left: 10px;
    }

    &::after {
      content: '';
      height: var(--fontsm);
      width: var(--fontsm);
      background: var(--white1);
      margin-left: 10px;
      transition: transform 0.15s ease-in;
      transform: translateX(0);
      -webkit-mask: url(${arrowRight}) center / contain no-repeat;
    }

    &:hover,
    &:focus {
      .icon,
      span {
        opacity: 1;
      }
      &::after {
        transform: translateX(10px);
      }
    }

    &:active {
      &::after {
        transform: translateX(5px);
      }
    }
  `
)
