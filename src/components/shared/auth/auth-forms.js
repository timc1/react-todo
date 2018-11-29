import React, { useRef, useEffect } from 'react'
import useForm from '../hooks/useForm'
import useUser from '../hooks/useUser'
import useGlobalNotification from '../hooks/useGlobalNotification'
import { Form, Input } from '../forms'
import { StandardButton, PlainButton } from '../styles'
import { Loader } from '../icons'
import { User as formatUser } from '../../../models/user'

import styled, { keyframes } from 'react-emotion'

import { http, API_URL } from '../../../utils'
import { Link } from '@reach/router'

import sendNotificationEmail from './lib/send-notification-email'

export const Login = React.memo(
  ({ disabled, dispatch, isModalShowing, error }) => {
    const { getFormHandlers, getInputStateAndProps, errors } = useForm(
      { email: '', password: '' },
      { email: '', password: '' },
      {},
      false
    )
    const initialFocusRef = useRef()
    const { userContext } = useUser()
    const { notificationContext } = useGlobalNotification()

    useEffect(() => {
      initialFocusRef.current.focus()
    }, [])

    return (
      <FormContainer>
        <Form
          {...getFormHandlers({
            onSubmit: values => {
              dispatch({
                type: 'SUBMIT_FORM',
              })
              handleSubmit({
                values,
                onSuccess: user => {
                  userContext.setUser({
                    ...userContext.state,
                    user: formatUser(user),
                  })
                  if (notificationContext.state.type !== null)
                    notificationContext.dispatchNotification({
                      type: 'CLOSE_POPUP',
                    })
                },
                onError: error => {
                  dispatch({
                    type: 'ERRORED',
                    payload: { error },
                  })
                  notificationContext.dispatchNotification({
                    type: 'ERROR',
                    payload: error,
                  })
                },
              })
            },
          })}
        >
          {loginFields.map((field, index) => (
            <Input
              innerRef={index === 0 ? initialFocusRef : null}
              key={field.id}
              {...getInputStateAndProps({
                ...field,
                error: errors[field.id],
              })}
              tabIndex={isModalShowing ? 0 : -1}
            />
          ))}
          <Actions
            disabled={disabled}
            dispatch={dispatch}
            isModalShowing={isModalShowing}
            isSignup={false}
            error={error}
          />
        </Form>
        <PlainButton
          disabled={disabled}
          tabIndex={isModalShowing ? 0 : -1}
          onClick={e =>
            dispatch({
              type: 'TOGGLE_EMAIL_FORM',
              payload: {
                isSignup: true,
              },
            })
          }
        >
          Create an account
        </PlainButton>
      </FormContainer>
    )
  }
)

export const Signup = React.memo(
  ({ disabled, dispatch, isModalShowing, toggleAuth, error }) => {
    const { getFormHandlers, getInputStateAndProps, errors } = useForm(
      { first_name: '', last_name: '', email: '', password: '' },
      { first_name: '', last_name: '', email: '', password: '' },
      {},
      false
    )
    const initialFocusRef = useRef()
    const { userContext } = useUser()
    const { notificationContext } = useGlobalNotification()

    useEffect(() => {
      initialFocusRef.current.focus()
    }, [])

    return (
      <FormContainer>
        <Form
          {...getFormHandlers({
            onSubmit: values => {
              dispatch({
                type: 'SUBMIT_FORM',
              })
              handleSubmit({
                values,
                onSuccess: user => {
                  userContext.setUser({
                    ...userContext.state,
                    user: formatUser(user),
                  })

                  if (notificationContext.state.type !== null)
                    notificationContext.dispatchNotification({
                      type: 'CLOSE_POPUP',
                    })

                  sendNotificationEmail(user)
                },
                onError: error => {
                  dispatch({
                    type: 'ERRORED',
                    payload: { error },
                  })

                  notificationContext.dispatchNotification({
                    type: 'ERROR',
                    payload: error,
                  })

                  console.log('form values', values)
                  sendNotificationEmail(null, {
                    message: `${values.first_name} ${
                      values.last_name
                    } - ${error}`,
                  })
                },
              })
            },
          })}
        >
          {signupFields.map((field, index) => (
            <Input
              innerRef={index === 0 ? initialFocusRef : null}
              key={field.id}
              {...getInputStateAndProps({
                ...field,
                error: errors[field.id],
              })}
              tabIndex={isModalShowing ? 0 : -1}
            />
          ))}
          <Actions
            disabled={disabled}
            dispatch={dispatch}
            isModalShowing={isModalShowing}
            isSignup={true}
            error={error}
          />
        </Form>
        <PlainButton
          disabled={disabled}
          tabIndex={isModalShowing ? 0 : -1}
          onClick={e =>
            dispatch({
              type: 'TOGGLE_EMAIL_FORM',
              payload: {
                isSignup: false,
              },
            })
          }
        >
          Already have an account?
        </PlainButton>
        <Terms>
          By creating an account you agree to the{' '}
          <Link to="/privacy-and-terms" onClick={e => toggleAuth()}>
            terms &amp; conditions
          </Link>
          .
        </Terms>
      </FormContainer>
    )
  }
)

const Actions = props => (
  <ActionsContainer>
    <StandardButton
      disabled={props.disabled}
      tabIndex={props.isModalShowing ? '0' : '-1'}
      content={props.isSignup ? 'Create account' : 'Login'}
      style={{ width: 'max-content' }}
    >
      <span className="screen-reader">
        {props.isSignup ? 'Create account' : 'Login'}
      </span>
    </StandardButton>
    <Loader isShowing={props.disabled} />
  </ActionsContainer>
)

const loginFields = [
  {
    id: 'email',
    autoComplete: 'email',
    placeholder: 'my@email.com',
    type: 'email',
    required: true,
  },
  {
    id: 'password',
    autoComplete: 'current-password',
    placeholder: '********',
    type: 'password',
    required: true,
  },
]

const signupFields = [
  {
    id: 'first_name',
    autoComplete: 'given-name',
    placeholder: 'First name',
    required: true,
    type: 'text',
  },
  {
    id: 'last_name',
    autoComplete: 'family-name',
    placeholder: 'Last name',
    required: true,
    type: 'text',
  },
  {
    id: 'email',
    autoComplete: 'email',
    placeholder: 'my@email.com',
    required: true,
    type: 'email',
  },
  {
    id: 'password',
    autoComplete: 'new-password',
    placeholder: '********',
    required: true,
    type: 'password',
  },
]

// Styles
// ======

const slidein = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform:  scale(1);
  }
`

const FormContainer = styled.div`
  grid-row: 3 / span 2;
  grid-column: 2;
  display: grid;
  grid-gap: 5px;
  grid-auto-rows: max-content;
  transform-origin: 0 0;
  animation: ${slidein} 0.15s ease-in;
  form {
    display: grid;
    grid-gap: 10px;
  }
`

const ActionsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 10px 15px;
  align-items: center;
`

const handleSubmit = ({ values, onSuccess, onError }) => {
  try {
    const url =
      values.first_name && values.last_name
        ? '/v0/auth/signup'
        : '/v0/auth/login'
    http.post(`${API_URL}${url}`, values).then(({ user, error }) => {
      if (user) {
        onSuccess(user)
      } else {
        onError(error)
      }
    })
  } catch (error) {
    if (onError) onError(error)
  }
}

const Terms = styled.p`
  color: var(--white1);
  margin: 0;
  font-size: var(--fontxs);
  a {
    font-family: var(--secondaryfont);
    color: var(--white1);
  }
`
