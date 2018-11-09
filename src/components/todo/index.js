import React from 'react'
import Heading from './heading'

import styled from 'react-emotion'

/**
 * Todo component takes a todo object
 * @param {Object} a todo object to render pre-render
 */
export default ({ todo }) => {
  return (
    <Container>
      <Heading date={{}} />
      {todo?.tasks ? todo.tasks.map(task => <div>task</div>) : null}
    </Container>
  )
}

// Styles
const Container = styled('div')`
  max-width: 500px;
  margin: auto;
`
