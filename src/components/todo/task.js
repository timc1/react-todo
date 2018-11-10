import React from 'react'
import useForm from '../shared/hooks/useForm'
import { Form, Input, Textarea } from '../shared/forms'

export default ({ isEditable, task, dispatch }) => {
  const { getInputStateAndProps, getFormHandlers } = useForm({
    title: '',
    description: '',
  })

  return (
    <Form {...getFormHandlers()}>
      <Input
        {...getInputStateAndProps({ id: 'title', autoComplete: 'Task Title' })}
      />
      <Textarea
        {...getInputStateAndProps({
          id: 'description',
          autoComplete: 'Description',
        })}
      />
      <button
        type="button"
        onClick={e => {
          dispatch({ type: 'REMOVE_TASK', id: task.id })
        }}
      >
        Remove Task
      </button>
    </Form>
  )
}
