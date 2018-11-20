import React, { useRef, useEffect } from 'react'
import useForm from '../hooks/useForm'
import useUser from '../hooks/useUser'
import { Form, Input } from '../forms'
import { StandardButton, PlainButton } from '../styles'
import { Loader } from '../icons'

import styled, { keyframes } from 'react-emotion'

export const Login = React.memo(({ disabled, dispatch, isModalShowing }) => {
  const { getFormHandlers, getInputStateAndProps, errors } = useForm(
    { email: '', password: '' },
    { email: '', password: '' },
    {},
    false
  )
  const initialFocusRef = useRef()
  const { userContext } = useUser()
  console.log('userContext', userContext)

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
        />
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
      </Form>
    </FormContainer>
  )
})

export const Signup = React.memo(({ disabled, dispatch, isModalShowing }) => {
  const { getFormHandlers, getInputStateAndProps, errors } = useForm(
    { first_name: '', last_name: '', email: '', password: '' },
    { first_name: '', last_name: '', email: '', password: '' },
    {},
    false
  )
  const initialFocusRef = useRef()

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
        />
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
      </Form>
    </FormContainer>
  )
})

const Actions = props => (
  <ActionsContainer>
    <StandardButton
      disabled={props.disabled}
      tabIndex={props.isModalShowing ? '0' : '-1'}
      content={props.isSignup ? 'Create account' : 'Login'}
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
    id: 'first_id',
    autoComplete: 'given-name',
    placeholder: 'First name',
    required: true,
    type: 'text',
  },
  {
    id: 'last_id',
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
  grid-gap: 10px;
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
  grid-gap: 15px;
  align-items: center;
`
