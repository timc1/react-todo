import React, { useState, useEffect } from 'react'
import Heading from './heading'

import styled from 'react-emotion'

import * as utils from './utils'

import { Todo, Task } from '../../models/todo'

export default () => {
  const [todo, setTodo] = useState(null)

  // useEffect will only be called once, when the component first mounts.
  // We will:
  // 1. Check localStorage to fetch all saved todos.
  // 2. Set todo state.
  useEffect(() => {
    let localTodos = window.localStorage.getItem('todos')
    if (localTodos) {
      localTodos = JSON.parse(localTodos)
    } else {
      localTodos = Todo()
    }
    setTodo(localTodos)
  }, [])

  return (
    <Container>
      {todo && (
        <>
          <Heading date={todo.date} />
          {todo?.tasks.length > 0
            ? todo.tasks.map(task => (
                <div key={`${task.title}${utils.getRandomHash()}`}>task</div>
              ))
            : null}
        </>
      )}
    </Container>
  )
}

// Styles
const Container = styled('div')`
  max-width: 500px;
  margin: auto;
`
