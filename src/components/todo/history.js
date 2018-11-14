import React from 'react'
import styled from 'react-emotion'

import { StandardButton } from '../shared/styles'

export default React.memo(({ allTodos, todoMetaDispatch }) => (
  <SideMenu>
    <ul>
      {allTodos &&
        allTodos.map(todo => (
          <li key={todo.id}>
            <StandardButton
              onClick={e =>
                todoMetaDispatch({
                  type: 'TOGGLE_EDIT',
                  payload: {
                    todoId: todo.id,
                  },
                })
              }
              content={todo.date}
            >
              {todo.date}
            </StandardButton>
          </li>
        ))}
    </ul>
  </SideMenu>
))

const SideMenu = styled('aside')``
