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

export default initialState => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, errors: {} })

  const getFormHandlers = () => ({
    onSubmit: e => {
      e.preventDefault()
      console.log('submit', state)
    },
  })

  const getInputStateAndProps = ({ id, ...rest }) => {
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
      ...rest,
    }
  }

  return {
    getFormHandlers,
    getInputStateAndProps,
  }
}
