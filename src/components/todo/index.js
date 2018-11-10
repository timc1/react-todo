import React, { useReducer, useEffect } from 'react'
import Heading from './heading'

import styled from 'react-emotion'

import { Todo as getTodoObject, Task as getTaskObject } from '../../models/todo'
import Task from './task'

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return getTodoObject()
    case 'ADD_TASK':
      return {
        ...state,
        ...state.tasks.push(action.payload),
      }
    case 'REMOVE_TASK':
      state.tasks = state.tasks.filter(task => task.id !== action.id)
      return {
        ...state,
      }
    case 'EDIT_TASK':
    default:
      return state
  }
}

export default () => {
  const [todo, dispatch] = useReducer(todoReducer, null)

  // useEffect will only be called once, when the component first mounts.
  // We will:
  // 1. Check localStorage to fetch all saved todos.
  // 2. Set todo state.
  useEffect(() => {
    let localTodos = window.localStorage.getItem('todos')
    if (localTodos) {
      localTodos = JSON.parse(localTodos)
    } else {
      localTodos = getTodoObject()
    }
    dispatch({ type: 'RESET' })
  }, [])

  return (
    console.log('todo', todo) || (
      <Container>
        {todo && (
          <>
            <Heading date={todo.date} />
            {todo?.tasks.length > 0 ? (
              todo.tasks.map(task => (
                <Task key={task.id} task={task} dispatch={dispatch} />
              ))
            ) : (
              <p>You have no tasks!</p>
            )}
            <AddNewButton
              onClick={() =>
                dispatch({
                  type: 'ADD_TASK',
                  payload: getTaskObject(),
                })
              }
            >
              + Add
            </AddNewButton>
            <button onClick={e => dispatch({ type: 'RESET' })}>Reset</button>
          </>
        )}
      </Container>
    )
  )
}

// Styles
const Container = styled('div')`
  max-width: 500px;
  margin: auto;
`

const AddNewButton = styled('button')``
