import { useEffect, useReducer } from 'react'
import { TodoMeta } from '../../../models/todo'

const todoMetaReducer = (state, action) => {
  console.log('state', state)
  console.log('action', action)
  switch (action.type) {
    case 'SETUP':
      return action.payload.todoMeta
    case 'DELETE':
      return state
    case 'TOGGLE_EDIT':
      state.currentTodoId = action.payload.todoId
      return state
    case 'ADD_TASK':
      // Array push mutates the original array - so we don't need to put the value in its own variable.
      state.todos
        .filter(todo => todo.id === state.currentTodoId)[0]
        .tasks.push(action.payload.task)
      return state
    case 'REMOVE_TASK':
      const todo = state.todos.filter(
        todo => todo.id === state.currentTodoId
      )[0]
      todo.tasks = todo.tasks.filter(task => task.id !== action.payload.taskId)
      state.todos = [{ ...state.todos, ...todo }]
      return state
    case 'UPDATE_TASK':
      const todoCopy = state.todos.filter(
        todo => todo.id === state.currentTodoId
      )[0]
      todoCopy.tasks = todoCopy.tasks.map(task => {
        if (task.id === action.payload.task.id) {
          task = action.payload.task
        }
        return task
      })

      state.todos = [{ ...state.todos, ...todoCopy }]
      return state
    default:
      return state
  }
}

export default ({ user }) => {
  const [todoMeta, todoMetaDispatch] = useReducer(todoMetaReducer, null)

  // Setup.
  useEffect(
    () => {
      if (user) {
        // Fetch user from db.
      } else {
        // Check localStorage and return
        todoMetaDispatch({
          type: 'SETUP',
          payload: {
            todoMeta: TodoMeta(),
          },
        })
      }
    },
    [user]
  )

  const getCurrentTodo = () => {
    if (todoMeta?.currentTodoId) {
      return todoMeta.todos.filter(
        todo => todo.id === todoMeta.currentTodoId
      )[0]
    }
    return null
  }

  const getAllTodos = () => {
    return todoMeta?.todos
  }

  return { getAllTodos, getCurrentTodo, todoMetaDispatch }
}
