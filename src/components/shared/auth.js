import React, { useRef, useReducer } from 'react'
import styled from 'react-emotion'

import Modal from './modal'
import { Form, Input } from './forms'
import useForm from './hooks/useForm'

import { PlainButton, StandardButton } from './styles'
import {
  Facebook as FBIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Loader,
} from './icons'
import arrowRight from '../../images/arrow-right.svg'

const reducer = (state, action) => {
  if (!state.isAuthorizing) {
    switch (action.type) {
      case 'TOGGLE_EMAIL_FORM':
        const { focusElement, ...rest } = action.payload
        focusElement()
        return {
          ...state,
          isEmailFormShowing: true,
          isSignup: false,
          ...rest,
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

export default ({ isShowing, toggleAuth }) => {
  const [state, dispatch] = useReducer(reducer, {
    isAuthorizing: false,
    isEmailFormShowing: false,
    isSignup: false,
    isLoading: false,
  })

  const loginFormInitialFocusRef = useRef()

  const { getFormHandlers, getInputStateAndProps, errors } = useForm(
    {
      email: '',
      password: '',
    },
    {
      email: '',
      password: '',
    },
    {
      email: value => value.length === 0,
      password: value => value.length < 5,
    },
    false
  )

  return (
    <Modal isShowing={isShowing} toggleModal={toggleAuth}>
      <Container>
        <Button disabled={state.isLoading} tabIndex={isShowing ? '0' : '-1'}>
          <FBIcon />
          <span>Continue with Facebook</span>
        </Button>
        <Button disabled={state.isLoading} tabIndex={isShowing ? '0' : '-1'}>
          <TwitterIcon />
          <span>Continue with Twitter</span>
        </Button>
        <Button
          onClick={e => {
            dispatch({
              type: 'TOGGLE_EMAIL_FORM',
              payload: {
                focusElement: () => loginFormInitialFocusRef.current.focus(),
              },
            })
          }}
          disabled={state.isLoading}
          tabIndex={isShowing ? '0' : '-1'}
        >
          <EmailIcon />
          <span>Continue with Email</span>
        </Button>
        <FormContainer isShowing={state.isEmailFormShowing}>
          <Form
            {...getFormHandlers({
              onSubmit: e => {
                if (state.isLoading !== true) {
                  // Update UI
                  dispatch({ type: 'SUBMIT_FORM' })
                  // Handle api call
                  handleSubmitForm({
                    isSignup: state.isSignup,
                    values: e,
                    dispatch,
                  })
                }
              },
            })}
          >
            <Input
              {...getInputStateAndProps({
                id: 'email',
                type: 'email',
                placeholder: 'my@email.com',
                tabIndex: state.isEmailFormShowing && isShowing ? '0' : '-1',
                innerRef: loginFormInitialFocusRef,
                required: true,
                error: errors.email,
              })}
            />
            <Input
              {...getInputStateAndProps({
                id: 'password',
                type: 'password',
                placeholder: '********',
                tabIndex: state.isEmailFormShowing && isShowing ? '0' : '-1',
                required: true,
                error: errors.password,
              })}
            />
            <Actions>
              <StandardButton
                content={state.isSignup ? 'Sign up' : 'Login'}
                style={{ maxWidth: 'max-content' }}
                disabled={state.isLoading}
                tabIndex={state.isEmailFormShowing && isShowing ? '0' : '-1'}
              >
                <span className="screen-reader">
                  {state.isSignup ? 'Sign up' : 'Login'}
                </span>
              </StandardButton>
              <Loader isShowing={state.isLoading} />
            </Actions>
          </Form>
          {!state.isSignup && (
            <PlainButton
              onClick={e => {
                if (!state.isLoading) {
                  dispatch({
                    type: 'TOGGLE_EMAIL_FORM',
                    payload: {
                      focusElement: () =>
                        loginFormInitialFocusRef.current.focus(),
                      isSignup: true,
                    },
                  })
                }
              }}
              disabled={state.isLoading}
              tabIndex={state.isEmailFormShowing && isShowing ? '0' : '-1'}
            >
              Create an account
            </PlainButton>
          )}
        </FormContainer>
      </Container>
    </Modal>
  )
}

const Container = styled.div`
  position: absolute;
  top: 100px;
  padding: 30px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
`

const FormContainer = styled.div`
  grid-row: 3 / span 2;
  grid-column: 2;
  display: grid;
  grid-gap: 10px;
  grid-auto-rows: max-content;
  opacity: ${props => (props.isShowing ? '1' : '0')};
  transform: ${props =>
    props.isShowing ? 'translateX(0) scale(1)' : 'translateX(-20px) scale(.9)'};
  transform-origin: 0 0;
  transition: 0.15s ease-in;
  pointer-events: ${props => (props.isShowing ? 'initial' : 'none')};
  form {
    display: grid;
    grid-gap: 10px;
  }
`

const Actions = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 15px;
  align-items: center;
`

const Button = React.memo(
  styled(PlainButton)`
    grid-column: 1;
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

const handleSubmitForm = ({ isSignup, values, dispatch }) => {
  console.log('isSignup', isSignup)
  console.log('values', values)
  console.log('dispatch', dispatch)
}
