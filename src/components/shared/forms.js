import styled from 'react-emotion'

export const Form = styled('form')``

export const Input = styled('input')`
  box-shadow: 0 0 0 1px ${props => (props.error ? '#ffc6ae' : 'transparent')};
  &::placeholder {
    color: ${props => (props.error ? '#ffc6ae' : 'var(--black4)')};
  }
`

export const Textarea = styled('textarea')``
