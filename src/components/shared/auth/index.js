import React, { useReducer } from 'react'
import styled from 'react-emotion'

import Modal from '../modal'

import { Login as LoginForm, Signup as SignupForm } from './auth-forms'

import { PlainButton } from '../styles'
import {
  Facebook as FBIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
} from '../icons'
import arrowRight from '../../../images/arrow-right.svg'

const reducer = (state, action) => {
  if (!state.isAuthorizing) {
    switch (action.type) {
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
      default:
        return state
    }
  }
  return state
}

export default React.memo(
  ({ isShowing: isModalShowing, toggleAuth }) => {
    const [state, dispatch] = useReducer(reducer, {
      isEmailFormShowing: false,
      isSignup: false,
      isLoading: false,
    })

    return (
      <Modal isShowing={isModalShowing} toggleModal={toggleAuth}>
        <Container>
          <ul>
            <li>
              <Button
                disabled={state.isLoading}
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
                  />
                ) : (
                  <LoginForm
                    disabled={state.isLoading}
                    dispatch={dispatch}
                    isModalShowing={isModalShowing}
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
  ul {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
  li {
    grid-column: 1;
  }
  li:last-child {
    grid-column: 2;
    grid-row: 3;
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
