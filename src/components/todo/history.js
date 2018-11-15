import React from 'react'
import styled from 'react-emotion'

import { StandardButton } from '../shared/styles'

export default React.memo(
  ({ allTodos, todoMetaDispatch, todoUIDispatch, isSideMenuHidden }) => (
    <SideMenu className="history">
      <Heading
        className="history-head"
        onClick={e =>
          todoUIDispatch({
            type: 'TOGGLE_HISTORY',
          })
        }
      >
        <h1>History</h1>
        <span>{isSideMenuHidden ? 'Show' : 'Hide'}</span>
      </Heading>
      <ul className="history-body">
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
  )
)

const SideMenu = styled.aside`
  ul {
    display: grid;
    grid-gap: 10px;
    padding: 35px 0;
  }
`

const Heading = styled.button``
