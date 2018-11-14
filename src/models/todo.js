import { getRandomHash } from '../utils'

export const TodoMeta = (data = {}) => {
  const date = Date.now()
  return {
    user_id: data.id || `${getRandomHash()}_${date}`,
    current_todo: data.current_todo || null,
    all_todos: data.all_todos || [
      Todo({
        id: '123abc',
        title: 'Test',
        description: 'description test',
        isComplete: true,
      }),
    ],
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
