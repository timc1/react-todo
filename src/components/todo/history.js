import React from 'react'
import styled from 'react-emotion'

import { StandardButton } from '../shared/styles'

export default React.memo(({ allTodos, todoMetaDispatch }) => (
  <SideMenu className="history">
    <Heading className="history-head">
      <h1>History</h1>
      <button>Hide</button>
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
))

const SideMenu = styled.aside`
  h1 {
    font-size: var(--fontsm);
    font-family: var(--secondaryfont);
    color: var(--white1);
    margin: 0 10px 0 0;
  }

  ul {
    display: grid;
    grid-gap: 10px;
    padding: 40px 0;
  }
`

const Heading = styled.div`
  display: flex;
  align-items: start;
`
