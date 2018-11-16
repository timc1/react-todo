import { useEffect, useReducer } from 'react'
import { TodoMeta, getUISettings } from '../../../models/todo'

const todoMetaReducer = (state, action) => {
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
      state.todos.reduce((allTodos, todo) => {
        if (todo.id === state.currentTodoId) {
          todo.tasks = todo.tasks.filter(
            task => task.id !== action.payload.taskId
          )
        }
        allTodos.push(todo)
        return allTodos
      }, [])

      return state
    case 'UPDATE_TASK':
      state.todos.reduce((allTodos, todo) => {
        if (todo.id === state.currentTodoId) {
          todo.tasks = todo.tasks.map(task => {
            if (task.id === action.payload.task.id) {
              task = action.payload.task
            }
            return task
          })
        }
        allTodos.push(todo)
        return allTodos
      }, [])
      return state
    default:
      return state
  }
}

export default ({ user }) => {
  const [todoMeta, todoMetaDispatch] = useReducer(
    todoMetaReducer,
    null,
    localStorage.getItem('todo_meta')
      ? {
          type: 'SETUP',
          payload: {
            todoMeta: TodoMeta(JSON.parse(localStorage.getItem('todo_meta'))),
          },
        }
      : {
          type: 'SETUP',
          payload: {
            todoMeta: TodoMeta(),
          },
        }
  )

  // Setup.
  useEffect(
    () => {
      if (user) {
        // Fetch user from db.
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

  return { getAllTodos, getCurrentTodo, todoMeta, todoMetaDispatch }
}

const todoUIReducer = (state, action) => {
  switch (action.type) {
    case 'RESET':
      return getUISettings()
    case 'SETUP':
      return action.payload.settings
    case 'TOGGLE_MENU':
      return {
        ...state,
        isSideMenuHidden: !state.isSideMenuHidden,
      }
    default:
      return state
  }
}

export const useTodoUI = () => {
  const [uiSettings, todoUIDispatch] = useReducer(
    todoUIReducer,
    localStorage.getItem('todos_ui_settings')
      ? JSON.parse(localStorage.getItem('todos_ui_settings'))
      : getUISettings()
  )

  return {
    uiSettings,
    todoUIDispatch,
  }
}
