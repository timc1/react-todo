import React from 'react'
import styled from 'react-emotion'

import TodoEditor from './todo-editor'
import History from './history'

import useTodo from '../shared/hooks/useTodo'

export default () => {
  // Setup.
  const { getAllTodos, getCurrentTodo, todoMetaDispatch } = useTodo({
    user: false,
  })

  return (
    <Container>
      <History allTodos={getAllTodos()} todoMetaDispatch={todoMetaDispatch} />
      <TodoEditor
        currentTodo={getCurrentTodo()}
        todoMetaDispatch={todoMetaDispatch}
      />
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 80px;
  align-items: start;
  padding: 0 var(--basepadding);

  .history {
    .history-head {
      transform: ${props => (props.isHidden ? 'rotate(90deg)' : 'rotate(0)')};
      transform-origin: 0 0;
      transform-property: transform, opacity;
      transition: 0.25s ease-in;
    }
    .history-body {
      transform: ${props =>
        props.isHidden ? 'translateY(100px)' : 'translateY(0)'};
      opacity: ${props => (props.isHidden ? '0' : '1')};
      transform-property: transform, opacity;
      transition: 0.25s ease-in;
    }
  }

  .todo-editor {
  }
`
