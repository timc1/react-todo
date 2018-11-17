import React, { useState } from 'react'
import Heading from './heading'

import styled from 'react-emotion'

import Task from './task'
import TaskEditor from './task-editor'

export default ({ currentTodo, todoMetaDispatch }) => {
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
              <NoOp style={{ marginTop: '38px' }}>Click + to add a task.</NoOp>
            )}
          </TaskContainer>

          <TaskEditor
            task={currentEditingTask}
            setCurrentEditingTask={setCurrentEditingTask}
            dispatch={todoMetaDispatch}
          />
        </>
      ) : (
        <NoOp>Select or create a new list from the menu.</NoOp>
      )}
    </Container>
  )
}

// Styles
const Container = styled.div`
  max-width: 40.625rem;
  width: 100%;
`

const TaskContainer = styled.div`
  margin-bottom: 45px;
`

const NoOp = React.memo(
  styled.p`
    margin: 0;
    font-size: var(--fontmd);
    font-family: var(--secondaryfont);
    color: var(--white1);
  `,
  (prevProps, nextProps) => prevProps.children === nextProps.children
)
