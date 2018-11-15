import { getRandomHash } from '../utils'

export const TodoMeta = (data = {}) => {
  return {
    user: data.user || null,
    todos: data.todos || [Todo()],
    currentTodoId: null,
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
        id: '123abc',
        title: 'Test',
        description: 'description test',
        isComplete: true,
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
