import React, { useState } from 'react'
import Heading from './heading'

import styled from 'react-emotion'

import Task from './task'
import TaskEditor from './task-editor'

export default React.memo(({ currentTodo, todoMetaDispatch }) => {
  const [currentEditingTask, setCurrentEditingTask] = useState(false)

  return (
    <Container className="todo-editor">
      {currentTodo ? (
        <>
          <Heading date={currentTodo.date} />
          <TaskContainer>
            {currentTodo?.tasks.length > 0 ? (
              currentTodo.tasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  dispatch={todoMetaDispatch}
                  setCurrentEditingTask={setCurrentEditingTask}
                />
              ))
            ) : (
              <p style={{ color: '#fff' }}>You have no tasks!</p>
            )}
          </TaskContainer>

          <TaskEditor
            task={currentEditingTask}
            setCurrentEditingTask={setCurrentEditingTask}
            dispatch={todoMetaDispatch}
          />
        </>
      ) : (
        <NoTodoSelected>Select a date or create a new list</NoTodoSelected>
      )}
    </Container>
  )
})

// Styles
const Container = styled.div`
  max-width: 650px;
  width: 100%;
`

const TaskContainer = styled.div`
  margin-bottom: 40px;
`

const NoTodoSelected = styled.div``
