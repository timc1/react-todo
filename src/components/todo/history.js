import React from 'react'
import styled from 'react-emotion'

import { StandardButton } from '../shared/styles'

const areEqual = (prevProps, nextProps) => {
  if (prevProps.allTodos.length !== nextProps.allTodos.length) {
    return false
  }
  return true
}

export default React.memo(
  ({ allTodos, todoMetaDispatch, todoUIDispatch, isSideMenuHidden }) => (
    <SideMenu className="history">
      <Heading
        className="history-head"
        aria-label={
          isSideMenuHidden
            ? 'Toggle to display history'
            : 'Toggle to hide history'
        }
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
                tabIndex={isSideMenuHidden ? '-1' : ''}
              >
                {todo.date}
              </StandardButton>
            </li>
          ))}
      </ul>
    </SideMenu>
  ),
  areEqual
)

const SideMenu = styled.aside`
  ul {
    display: grid;
    grid-gap: 10px;
    padding: 35px 0;
  }
`

const Heading = styled.button``
