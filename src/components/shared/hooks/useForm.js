import { useReducer, useEffect } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      const { id, value } = action.payload
      state[id] = value
      return state
    case 'RESET':
      return {
        ...state,
        ...action.payload,
      }
    case 'UPDATE_ERRORS':
      state.errors = action.payload
      return state
    case 'UPDATE_INITIAL_STATE':
      return {
        ...action.payload,
        errors: {},
      }
    default:
      return state
  }
}

export default (initialState, resetValues = {}, validations = {}, ...rest) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, errors: {} })

  // Check if initialState prop has changed.
  useEffect(
    () => {
      dispatch({ type: 'UPDATE_INITIAL_STATE', payload: initialState })
    },
    [JSON.stringify(initialState)]
  )

  const getFormHandlers = ({ onSubmit, postSubmit }) => ({
    onSubmit: async e => {
      e.preventDefault()

      // Destructure out the errors object so we just get the ids of the form.
      const { errors: destructuredErrors, ...ids } = state

      const errors = await _validate(Object.keys(ids))

      if (Object.keys(errors).length === 0) {
        if (onSubmit) {
          onSubmit(ids)
          if (postSubmit) postSubmit()
          dispatch({ type: 'RESET', payload: resetValues })
        }
      } else {
        console.log('fix errors')
      }
    },
  })

  const _validate = ids => {
    return new Promise(resolve => {
      const errors = Object.assign({}, state.errors)
      for (let id of ids) {
        if (validations[id]) {
          const isErrored = validations[id](state[id])
          if (isErrored) {
            errors[id] = 'is errored'
          } else {
            delete errors[id]
          }
        }
      }
      dispatch({ type: 'UPDATE_ERRORS', payload: errors })
      resolve(errors)
    })
  }

  const getInputStateAndProps = ({ id, type, onBlur, ...rest }) => {
    return {
      id,
      onChange: e =>
        dispatch({
          type: 'INPUT_CHANGE',
          payload: {
            id,
            value: e.target.value,
          },
        }),
      value: state[id],
      type: type ? type : 'text',
      onBlur: onBlur
        ? e => {
            onBlur(e)
            _validate([id])
          }
        : e => _validate([id]),
      ...rest,
    }
  }

  return {
    getFormHandlers,
    getInputStateAndProps,
    errors: state.errors,
  }
}
