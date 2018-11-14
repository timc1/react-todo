import React, { useReducer, useState, useEffect } from 'react'
import Heading from './heading'

import styled from 'react-emotion'

import { Todo as getTodoObject } from '../../models/todo'
import Task from './task'
import Editor from './editor'

import useLocalStorage from '../shared/hooks/useLocalStorage'

const todoReducer = (state, action) => {
  let updated
  switch (action.type) {
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
    case 'UPDATE_TASK':
      state.tasks[action.payload.id] = action.payload
      updated = state.tasks.map(task => {
        if (task.id === action.payload.id) {
          task = action.payload
        }
        return task
      })
      state.tasks = updated
      return {
        ...state,
        ...state.tasks,
      }
    case 'CHECK_TASK':
      updated = state.tasks.map(task => {
        if (task.id === action.id) {
          task.isComplete = !task.isComplete
        }
        return task
      })
      state.tasks = updated
      return {
        ...state,
      }
    default:
      return state
  }
}

export default ({ currentTodo: todo, dispatch }) => {
  const [currentEditingTask, setCurrentEditingTask] = useState(false)

  // useEffect will only be called once, when the component first mounts.
  // We will:
  // 1. Check localStorage to fetch all saved todos.
  // 2. Set todo state.
  //useEffect(() => {
  //  dispatch({ type: 'SETUP', payload: currentTodo })
  //}, [])

  // This will diff any changes that happen in our todos list and then update
  // localStorage to reflect that change. It only updates 1.5 seconds after a change
  // has happened and if the change doesn't match the currently cached object in localStorage.
  //useLocalStorage({
  //  name: 'todos',
  //  objectToUpdate: todo,
  //})
  //

  return (
    <Container>
      {todo && (
        <>
          <Heading date={todo.date} />
          <TaskContainer>
            {todo?.tasks.length > 0 ? (
              todo.tasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  dispatch={dispatch}
                  setCurrentEditingTask={setCurrentEditingTask}
                />
              ))
            ) : (
              <p style={{ color: '#fff' }}>You have no tasks!</p>
            )}
          </TaskContainer>

          <Editor
            task={currentEditingTask}
            setCurrentEditingTask={setCurrentEditingTask}
            dispatch={dispatch}
          />
        </>
      )}
    </Container>
  )
}

// Styles
const Container = styled('div')`
  max-width: 650px;
  width: 100%;
  padding: 0 15px 100px 15px;
  display: inline-block;
  vertical-align: top;
`

const TaskContainer = styled('div')`
  margin-bottom: 40px;
`
