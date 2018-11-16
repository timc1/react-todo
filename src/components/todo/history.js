import React from 'react'
import styled from 'react-emotion'
import { StandardButton } from '../shared/styles'

export default ({
  allTodos,
  currentTodo,
  todoMetaDispatch,
  isSideMenuHidden,
}) => (
  <Ul>
    {allTodos &&
      allTodos.map(todo => (
        <Li key={todo.id} isActive={todo.id === currentTodo.id}>
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
        </Li>
      ))}
  </Ul>
)

const Ul = styled.ul`
  display: grid;
  grid-gap: 10px;
`

const Li = styled.li`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    height: 0.25rem;
    width: 0.25rem;
    border-radius: 50%;
    background: var(--white1);
    opacity: ${props => (props.isActive ? 1 : 0)};
    transition: opacity 0.15s ease-in;
  }
`
