import React from 'react'

export default ({ isEditable, task, dispatch }) => {
  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
    </div>
  )
}
