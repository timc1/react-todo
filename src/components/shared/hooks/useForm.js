import { useReducer } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      const { id, value } = action.payload
      state[id] = value
      return state
    default:
      return state
  }
}

export default (initialState, validations = {}) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, errors: {} })

  const getFormHandlers = () => ({
    onSubmit: e => {
      e.preventDefault()
      const { errors, ...fields } = { ...state.errors, ...state }
      const ids = Object.keys(fields)
      _validate(ids)
      if (Object.keys(state.errors).length === 0) {
        console.log('submit')
      } else {
        console.log('fix errors')
      }
    },
  })

  const _validate = ids => {
    const batch = {}
    for (let id of ids) {
      if (validations[id]) {
        const isErrored = validations[id](state[id])
        if (isErrored) {
          state.errors[id] = 'is errored'
        } else {
          delete state.errors[id]
        }
      }
    }
    state.errors = {
      ...state.errors,
      ...batch,
    }
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
