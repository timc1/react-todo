import { getRandomHash } from '../utils'

export const TodoMeta = (data = {}) => {
  const defaultTodo = Todo()
  const another = Todo({ date: 'Wed Nov 14 2018' })
  return {
    user: data.user || null,
    todos: data.todos || [defaultTodo, another],
    currentTodoId: data.currentTodoId || defaultTodo.id,
  }
}

export const Todo = (data = {}) => {
  return {
    id: data.id || getRandomHash(),
    date:
      data.date ||
      Date()
        .toLocaleString()
        .split(' ')
        .splice(0, 4)
        .join(' '),
    tasks: data.tasks || [
      Task({
        id: 'default_0',
        title: 'A thing that needs to be done today',
        description: 'An optional description here.',
        isComplete: false,
      }),
    ],
  }
}

export const Task = (task = {}) => {
  return {
    id: task.id || getRandomHash(),
    title: task.title || '',
    description: task.description || '',
    isComplete: task.isComplete !== undefined ? task.isComplete : false,
  }
}

export const getUISettings = (settings = {}) => {
  return {
    isSideMenuHidden: settings.isSideMenuHidden || false,
  }
}
