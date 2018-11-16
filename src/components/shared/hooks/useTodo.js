import { useEffect, useReducer } from 'react'
import { TodoMeta, Todo, getUISettings } from '../../../models/todo'

const todoMetaReducer = (state, action) => {
  let copy
  switch (action.type) {
    case 'SETUP':
      return action.payload.todoMeta
    case 'ADD_TODAYS_TODO':
      const todaysTodo = Todo({
        tasks: [],
      })

      copy = state.todos.slice()
      copy.push(todaysTodo)
      return {
        ...state,
        currentTodoId: todaysTodo.id,
        todos: copy,
      }
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

      return {
        ...state,
        currentTodoId: todo.id,
        todos: copy,
      }
    case 'TOGGLE_EDIT':
      copy = Object.assign({}, state)
      copy.currentTodoId = action.payload.todoId
      return copy
    case 'ADD_TASK':
      // Array push mutates the original array - so we don't need to put the value in its own variable.
      copy = state.todos.slice()
      copy
        .filter(todo => todo.id === state.currentTodoId)[0]
        .tasks.push(action.payload.task)
      return {
        ...state,
        todos: copy,
      }
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

      return {
        ...state,
        todos: copy,
      }
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
      return {
        ...state,
        todos: copy,
      }
    default:
      return state
  }
}

export default ({ user }) => {
  const [todoMeta, todoMetaDispatch] = useReducer(
    todoMetaReducer,
    null,
    (function() {
      try {
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
    })()
  )

  // Setup if user exists.
  useEffect(
    () => {
      if (user) {
        // Fetch user from db.
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
