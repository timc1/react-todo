import React from 'react'

import TodoEditor from './todo-editor'
import History from './history'

import useTodo from '../shared/hooks/useTodo'

export default () => {
  // Setup.
  const { getAllTodos, getCurrentTodo, todoMetaDispatch } = useTodo({
    user: false,
  })

  return (
    <div>
      <History allTodos={getAllTodos()} todoMetaDispatch={todoMetaDispatch} />
      <TodoEditor
        currentTodo={getCurrentTodo()}
        todoMetaDispatch={todoMetaDispatch}
      />
    </div>
  )
}
