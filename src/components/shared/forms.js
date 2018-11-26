import React from 'react'
import styled from 'react-emotion'

const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.value !== nextProps.value ||
    prevProps.tabIndex !== nextProps.tabIndex ||
    prevProps.error !== nextProps.error
  )
    return false
  return true
}

export const Form = styled('form')``

export const Input = React.memo(
  styled('input')`
    box-shadow: 0 0 0 1px
      ${props => (props.error ? 'var(--error)' : 'transparent')};
    &::placeholder {
      color: ${props => (props.error ? 'var(--error)' : 'var(--black4)')};
    }
  `,
  areEqual
)

export const Textarea = React.memo(styled('textarea')``, areEqual)
