import { getRandomHash } from '../utils'

export const TodoMeta = (data = {}) => {
  const defaultTodo = Todo()
  return {
    user: data.user || null,
    todos: data.todos || [defaultTodo],
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
        title: 'Task',
        description: `Here's an optional description - hover me to edit, click me to complete.`,
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
    isSideMenuHidden: settings.isSideMenuHidden || true,
  }
}
