export const Todo = (data = {}) => {
  return {
    date:
      data.date ||
      Date()
        .toLocaleString()
        .split(' ')
        .splice(0, 4)
        .join(' '),
    tasks: data.tasks || [],
  }
}

export const Task = (task = {}) => {
  return {
    title: task.title || '',
    description: task.description || '',
  }
}
