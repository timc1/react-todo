import React, { useRef, useEffect } from 'react'
import { StandardButton } from '../shared/styles'
import { Form, Input, Textarea } from '../shared/forms'
import useForm from '../shared/hooks/useForm'
import { Task as getTaskObject } from '../../models/todo'
import styled from 'react-emotion'

const handleKeyDown = ({
  event,
  setCurrentEditingTask,
  elemToFocusAfterClose,
  submitButton,
}) => {
  const key = event.key.toUpperCase()
  if (key === 'ESCAPE' || key === 'ENTER') {
    event.preventDefault()
    switch (key) {
      case 'ESCAPE':
        setCurrentEditingTask(false)
        elemToFocusAfterClose.current.focus()
        break
      case 'ENTER':
        submitButton.current.click()
        break
      default:
        break
    }
  }
}

// Variable to store our eventListener reference.
let eventListener

export default React.memo(({ task, setCurrentEditingTask, dispatch }) => {
  const form = useRef(null)
  const focusInput = useRef(null)
  const toggleButton = useRef(null)
  const submitButton = useRef(null)
  const { getInputStateAndProps, getFormHandlers, errors } = useForm(
    {
      title: task.id ? task.title : '',
      description: task.id ? task.description : '',
    },
    {
      title: '',
      description: '',
    },
    {
      title: value => value.length === 0,
    }
  )

  // Setup event listener for keydown (esc, enter)
  useEffect(() => {
    eventListener = e =>
      handleKeyDown({
        event: e,
        setCurrentEditingTask,
        elemToFocusAfterClose: toggleButton,
        submitButton,
      })
  }, [])

  // Unmount event listener when our task modal is hidden. Usually we can just
  // return a function to remove listeners on unmount - but since our
  // component never unmounts, we need to remove the listeners another way.
  useEffect(
    () => {
      if (task) {
        form.current.addEventListener('keydown', eventListener)
      } else {
        form.current.removeEventListener('keydown', eventListener)
      }
    },
    [task]
  )

  useEffect(
    () => {
      if (task) {
        focusInput.current.focus()
      }
    },
    [task]
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
        aria-label={
          task ? 'Toggle to exit new task form' : 'Toggle to add a new task'
        }
        innerRef={toggleButton}
      />
      <ThemeContainer isShowing={task}>
        <Form
          innerRef={form}
          {...getFormHandlers({
            onSubmit: task.id
              ? values => {
                  dispatch({
                    type: 'UPDATE_TASK',
                    payload: {
                      task: getTaskObject({ ...values, id: task.id }),
                    },
                  })
                  setCurrentEditingTask(false)
                }
              : values => {
                  dispatch({
                    type: 'ADD_TASK',
                    payload: {
                      task: getTaskObject(values),
                    },
                  })
                  setCurrentEditingTask(false)
                },
            postSubmit: e => toggleButton.current.focus(),
          })}
        >
          <Input
            {...getInputStateAndProps({
              id: 'title',
              autoComplete: 'off',
              placeholder: 'Task Title',
              spellCheck: 'false',
            })}
            error={errors.title}
            tabIndex={task ? '0' : '-1'}
            innerRef={focusInput}
            aria-label="You are on an input field for task title. Click the escape key to exit new task form."
          />
          <Textarea
            {...getInputStateAndProps({
              id: 'description',
              autoComplete: 'off',
              placeholder: 'Description',
              spellCheck: 'false',
            })}
            error={errors.description}
            tabIndex={task ? '0' : '-1'}
            aria-label="You are on an input field for task description. Click the escape key to exit new task form."
          />
          <StandardButton
            content={task.id ? 'Update' : '+ Add'}
            tabIndex={task ? '0' : '-1'}
            innerRef={submitButton}
            aria-label={
              task.id
                ? `Toggle to update ${task.title}`
                : `Toggle to add ${task.title}`
            }
          />
        </Form>
      </ThemeContainer>
    </Container>
  )
})

const Container = styled('div')`
  position: relative;
`

const ThemeContainer = styled('div')`
  width: 100%;
  margin-bottom: 60px;
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
