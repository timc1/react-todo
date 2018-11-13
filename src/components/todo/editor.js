import React from 'react'
import { StandardButton } from '../shared/styles'
import { Form, Input, Textarea } from '../shared/forms'
import useForm from '../shared/hooks/useForm'
import { Task as getTaskObject } from '../../models/todo'
import styled from 'react-emotion'

export default React.memo(({ task, setCurrentEditingTask, dispatch }) => {
  const { getInputStateAndProps, getFormHandlers, errors } = useForm(
    {
      title: task.id ? task.title : '',
      description: task.id ? task.description : '',
    },
    {
      title: value => value.length === 0,
    }
  )

  return (
    <Container>
      <StandardButton
        onClick={
          task
            ? e => setCurrentEditingTask(false)
            : e => setCurrentEditingTask({})
        }
        content={task ? 'back' : '+'}
        aria-label={task ? 'Exit Form' : 'Add New Task'}
      />
      <ThemeContainer isShowing={task}>
        <Form
          {...getFormHandlers({
            onSubmit: task.id
              ? values => {
                  dispatch({
                    type: 'UPDATE_TASK',
                    payload: {
                      ...getTaskObject({ ...values, id: task.id }),
                    },
                  })
                  setCurrentEditingTask(false)
                }
              : values => {
                  dispatch({
                    type: 'ADD_TASK',
                    payload: getTaskObject(values),
                  })
                  setCurrentEditingTask(false)
                },
          })}
        >
          <Input
            {...getInputStateAndProps({
              id: 'title',
              autoComplete: 'off',
              placeholder: 'Task Title',
              spellCheck: 'off',
            })}
            error={errors.title}
          />
          <Textarea
            {...getInputStateAndProps({
              id: 'description',
              autoComplete: 'off',
              placeholder: 'Description',
              spellCheck: 'off',
            })}
            error={errors.description}
          />
          <StandardButton content={task.id ? 'Update' : '+ Add'}>
            {task.id ? 'Update' : '+ Add'}
          </StandardButton>
        </Form>
      </ThemeContainer>
    </Container>
  )
})

const Container = styled('div')`
  position: relative;
`

const ThemeContainer = styled('div')`
  position: absolute;
  top: 60px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  transform-property: transform, opacity;
  transform: scale(${props => (props.isShowing ? '1' : '0.9')});
  opacity: ${props => (props.isShowing ? '1' : '0')};
  pointer-events: ${props => (props.isShowing ? 'initial' : 'none')};
  transition: 0.25s var(--cubicbounce);
  transform-origin: 0 0;

  input,
  textarea {
    margin-bottom: 10px;
  }
  form {
    grid-column: span 2;
    padding: 10px 0;
  }
`
