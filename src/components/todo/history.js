import React from 'react'
import styled from 'react-emotion'
import { StandardButton } from '../shared/styles'

const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.allTodos.length !== nextProps.allTodos.length ||
    prevProps.currentTodo.id !== nextProps.currentTodo.id ||
    prevProps.isSideMenuHidden !== nextProps.isSideMenuHidden
  )
    return false
  return true
}

export default React.memo(
  ({ allTodos, currentTodo, todoMetaDispatch, isSideMenuHidden }) => (
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
              tabIndex={isSideMenuHidden ? '-1' : '0'}
            >
              {todo.date}
            </StandardButton>
          </Li>
        ))}
    </Ul>
  ),
  areEqual
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
