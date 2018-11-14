import React from 'react'
import styled from 'react-emotion'

export default React.memo(({ allTodos, dispatch }) => (
  <Aside>
    <ul>
      {allTodos &&
        allTodos.map(todo => (
          <li key={todo.id}>
            <button
              onClick={e =>
                dispatch({
                  type: 'UPDATE_CURRENT_EDITING_TODO',
                  payload: todo,
                })
              }
            >
              {todo.date}
            </button>
          </li>
        ))}
    </ul>
  </Aside>
))

export const Aside = styled('aside')`
  display: inline-block;
  vertical-align: top;
  max-width: 300px;
  width: 100%;
`
