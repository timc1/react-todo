import { useState, useEffect, useReducer } from 'react'
import { TodoMeta, Todo, getUISettings } from '../../../models/todo'
import { User } from '../../../models/user'
import { http, API_URL } from '../../../utils'
import { saveToDB } from './lib/useTodo'
import useGlobalNotification from './useGlobalNotification'

export default ({ user }) => {
  const [isLoading, setLoading] = useState(user ? true : false)
  const { notificationContext } = useGlobalNotification()
  const [todoMeta, todoMetaDispatch] = useReducer(
    metaReducer(user, notificationContext.dispatchNotification),
    null,
    user ? null : getMeta()
  )

  // Setup if user exists.
  useEffect(
    () => {
      if (user) {
        if (!isLoading) setLoading(true)
        // Fetch user from db.
        const url = API_URL + '/v0/todos'
        http.get(url).then(({ error, data }) => {
          if (error) return
          // TODO: Dispatch a global error.
          todoMetaDispatch(getMeta(data))
          setLoading(false)
        })
      } else {
        if (isLoading) setLoading(false)
        todoMetaDispatch(getMeta())
      }
    },
    [user]
  )

  const getAllTodos = () => {
    const sorted = todoMeta?.todos.sort(
      (t1, t2) => new Date(t2.date) - new Date(t1.date)
    )
    return sorted
  }

  const getCurrentTodo = () => {
    if (todoMeta?.currentTodoId) {
      return todoMeta.todos.filter(
        todo => todo.id === todoMeta.currentTodoId
      )[0]
    }
    return null
  }

  return {
    isTodosLoading: isLoading,
    getAllTodos,
    getCurrentTodo,
    todoMeta,
    todoMetaDispatch,
  }
}

/**
 * Returns a standard reducer function to React's useReducer function.
 * The function returned is passed two additional props:
 *
 * @param {Object} user the user object from useUser hook
 * @param {Function} dispatchNotification the dispatch function from useGlobalNotification hook
 * @return {Object} the state
 */

const metaReducer = (user, dispatchNotification) => (state, action) => {
  let copy, updatedState, body

  switch (action.type) {
    case 'SETUP':
      updatedState = action.payload.todoMeta
      break
    case 'ADD_TODAYS_TODO':
      const todaysTodo = Todo({ tasks: [] })
      copy = state.todos.slice()
      copy.push(todaysTodo)
      updatedState = {
        ...state,
        currentTodoId: todaysTodo.id,
        todos: copy,
      }

      if (user)
        body = {
          type: action.type,
          todoID: todaysTodo.id,
          date: todaysTodo.date,
          userID: user.id,
        }

      break
    case 'ADD_TOMORROWS_TODO':
      const today = new Date()
      const tomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1)
      const todo = Todo({
        tasks: [],
        date: tomorrow,
      })
      copy = state.todos.slice()
      copy.push(todo)
      updatedState = {
        ...state,
        currentTodoId: todo.id,
        todos: copy,
      }

      if (user)
        body = {
          type: action.type,
          todoID: todo.id,
          date: tomorrow,
          userID: user.id,
        }

      break
    case 'TOGGLE_EDIT':
      copy = Object.assign({}, state)
      copy.currentTodoId = action.payload.todoId
      updatedState = copy

      if (user)
        body = {
          type: action.type,
          todoID: copy.currentTodoId,
          userID: user.id,
        }

      break
    case 'ADD_TASK':
      // Array push mutates the original array - so we don't need to put the value in its own variable.
      copy = state.todos.slice()
      copy
        .filter(todo => todo.id === state.currentTodoId)[0]
        .tasks.push(action.payload.task)
      updatedState = {
        ...state,
        todos: copy,
      }

      if (user)
        body = {
          type: action.type,
          todoID: state.currentTodoId,
          task: {
            ...action.payload.task,
            title: encodeURIComponent(action.payload.task.title),
            description: encodeURIComponent(action.payload.task.description),
          },
          timestamp: Date.now(),
          userID: user.id,
        }

      break
    case 'REMOVE_TASK':
      copy = state.todos.slice()
      copy.reduce((allTodos, todo) => {
        if (todo.id === state.currentTodoId) {
          todo.tasks = todo.tasks.filter(
            task => task.id !== action.payload.taskId
          )
        }
        allTodos.push(todo)
        return allTodos
      }, [])

      updatedState = {
        ...state,
        todos: copy,
      }

      if (user)
        body = {
          type: action.type,
          taskID: action.payload.taskId,
          userID: user.id,
        }

      break
    case 'UPDATE_TASK':
      copy = state.todos.slice()
      copy.reduce((allTodos, todo) => {
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

      updatedState = {
        ...state,
        todos: copy,
      }

      if (user)
        body = {
          type: action.type,
          task: {
            ...action.payload.task,
            title: encodeURIComponent(action.payload.task.title),
            description: encodeURIComponent(action.payload.task.description),
          },
          timestamp: Date.now(),
          userID: user.id,
        }

      break
    case 'UPDATE_ERROR':
      updatedState = {
        ...state,
        error: action.payload.error,
      }
      break
    default:
      updatedState = state
  }

  if (user && body) {
    saveToDB(body).then(({ error, data }) => {
      if (error) {
        dispatchNotification({
          type: 'ERROR',
          payload: error,
        })
      }
    })
  }

  return updatedState
}

const getMeta = data => {
  try {
    if (data) {
      return {
        type: 'SETUP',
        payload: {
          todoMeta: TodoMeta({
            ...data,
            user: User(data.user),
          }),
        },
      }
    }
    return {
      type: 'SETUP',
      payload: {
        todoMeta: TodoMeta(JSON.parse(localStorage.getItem('todo_meta'))),
      },
    }
  } catch (err) {
    return {
      type: 'SETUP',
      payload: {
        todoMeta: TodoMeta(),
      },
    }
  }
}

// Todos UI
// ========
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

const formatUISettings = () => {
  if (
    localStorage.getItem('todos_ui_settings') !== 'null' &&
    localStorage.getItem('todos_ui_settings') !== null
  ) {
    try {
      return JSON.parse(localStorage.getItem('todos_ui_settings'))
    } catch (err) {
      return getUISettings()
    }
  } else {
    return getUISettings()
  }
}

export const useTodoUI = () => {
  const [uiSettings, todoUIDispatch] = useReducer(
    todoUIReducer,
    formatUISettings()
  )

  return {
    uiSettings,
    todoUIDispatch,
  }
}
