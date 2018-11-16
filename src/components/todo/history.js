import React from 'react'
import styled from 'react-emotion'
import { PlainButton } from '../shared/styles'

const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.allTodos.length !== nextProps.allTodos.length ||
    prevProps.currentTodo?.id !== nextProps.currentTodo?.id ||
    prevProps.isSideMenuHidden !== nextProps.isSideMenuHidden
  )
    return false
  return true
}

export default React.memo(
  ({ allTodos, currentTodo, todoMetaDispatch, isSideMenuHidden }) => (
    <Ul>
      {allTodos.length > 0 ? (
        allTodos.map(todo => (
          <Li key={todo.id} isActive={todo.id === currentTodo.id}>
            <Button
              onClick={e =>
                todoMetaDispatch({
                  type: 'TOGGLE_EDIT',
                  payload: {
                    todoId: todo.id,
                  },
                })
              }
              aria-label={`Toggle to edit task for date ${todo.date}`}
              tabIndex={isSideMenuHidden ? '-1' : '0'}
            >
              <span>{todo.date}</span>
            </Button>
          </Li>
        ))
      ) : (
        <P>
          Each day will be saved and viewable here. Click an option above to get
          started.
        </P>
      )}
    </Ul>
  ),
  areEqual
)

const Ul = styled.ul`
  display: grid;
  grid-gap: 5px;
`

const Li = styled.li`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 0.25rem;
    width: 0.25rem;
    border-radius: 50%;
    background: var(--white1);
    opacity: ${props => (props.isActive ? 1 : 0)};
    transition: opacity 0.15s ease-in;
  }
  > button {
    transition: transform 0.15s ease-in;
    transform: ${props =>
      props.isActive ? 'translateX(.75rem)' : 'translateX(0)'};
    > span {
      opacity: ${props => (props.isActive ? '1 !important' : '.7')};
    }
  }
`

const P = styled.p`
  margin: 0;
  font-size: var(--fontxs);
  color: var(--black4);
`

const Button = styled(PlainButton)`
  > span {
    opacity: 0.7;
    transition: opacity 0.15s ease-in;
  }

  &:hover,
  &:focus {
    > span {
      opacity: 1;
    }
  }

  &:active {
    > span {
      opacity: 0.7;
    }
  }
`
