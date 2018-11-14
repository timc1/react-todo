import React, { useReducer, useEffect } from 'react'

import styled from 'react-emotion'

import {
  Todo as getTodoObject,
  TodoMeta as getTodoMetaObject,
} from '../../models/todo'

import useLocalStorage from '../shared/hooks/useLocalStorage'

import SideMenu from './side-menu'
import CurrentTodo from './current-todo'

const metaReducer = (state, action) => {
  console.log('state', state)
  console.log('action', action)
  switch (action.type) {
    case 'SETUP':
      return action.payload
    case 'RESET':
      return getTodoMetaObject()
    case 'DELETE_SINGLE_TODO':
      return state
    case 'UPDATE_CURRENT_EDITING_TODO':
      return state
    default:
      return state
  }
}

export default () => {
  const [todosMeta, dispatch] = useReducer(metaReducer, null)

  // Check for todo_meta, an object containing all data for all todos.
  useEffect(() => {
    const meta = localStorage.getItem('todo_meta')
      ? JSON.parse(localStorage.getItem('todo_meta'))
      : null
    if (meta) {
      dispatch({ type: 'SETUP', payload: meta })
    } else {
      dispatch({ type: 'RESET' })
    }
  }, [])

  useLocalStorage({
    name: 'todo_meta',
    objectToUpdate: todosMeta,
  })

  return (
    <Container>
      {todosMeta && (
        <>
          <SideMenu allTodos={todosMeta.all_todos} dispatch={dispatch} />
          <CurrentTodo
            currentTodo={todosMeta.current_todo}
            dispatch={dispatch}
          />
        </>
      )}
    </Container>
  )
}

const Container = styled('div')``
