import React from 'react'
import { StandardButton } from '../shared/styles'
import { Form, Input, Textarea } from '../shared/forms'
import useForm from '../shared/hooks/useForm'
import { Todo as getTodoObject } from '../../models/todo'
import styled from 'react-emotion'

export default React.memo(({ task, setCurrentEditingTask, dispatch }) => {
  const { getInputStateAndProps, getFormHandlers } = useForm(
    {
      title: task ? task.title : '',
      description: task ? task.description : '',
    },
    {
      title: value => value.length === 0,
    }
  )

  return task ? (
    <>
      <StandardButton onClick={e => setCurrentEditingTask(false)}>
        back
      </StandardButton>
      <ThemeContainer>
        <Form {...getFormHandlers()}>
          <Input
            {...getInputStateAndProps({
              id: 'title',
              autoComplete: 'off',
              placeholder: 'Task Title',
              spellCheck: 'off',
            })}
          />
          <Textarea
            {...getInputStateAndProps({
              id: 'description',
              autoComplete: 'off',
              placeholder: 'Description',
              spellCheck: 'off',
            })}
          />
          <StandardButton
            onClick={e =>
              dispatch({
                type: 'ADD_TASK',
                payload: getTodoObject(),
              })
            }
          >
            + Add
          </StandardButton>
        </Form>
      </ThemeContainer>
    </>
  ) : (
    <StandardButton onClick={e => setCurrentEditingTask(true)}>
      +
    </StandardButton>
  )
})

const ThemeContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  input,
  textarea {
    margin-bottom: 10px;
  }
  form {
    grid-column: span 2;
    padding: 10px 0;
  }
`
