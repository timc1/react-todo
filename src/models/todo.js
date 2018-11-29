import { getRandomHash, formatDate } from '../utils'

export const TodoMeta = (data = {}) => {
  return {
    user: data.user || null,
    todos: data.todos || [],
    currentTodoId: data.currentTodoId || null,
  }
}

export const Todo = (data = {}) => {
  return {
    id: data.id || getRandomHash(),
    date: formatDate(data.date) || formatDate(Date()),
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
    title: decodeURIComponent(task.title) || '',
    description: decodeURIComponent(task.description) || '',
    isComplete: task.isComplete !== undefined ? task.isComplete : false,
  }
}

export const getUISettings = (settings = {}) => {
  return {
    isSideMenuHidden: settings.isSideMenuHidden || true,
  }
}
