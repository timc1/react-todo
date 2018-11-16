import React from 'react'
import styled from 'react-emotion'

import { StandardButton } from '../shared/styles'

import History from './history'

const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.allTodos.length !== nextProps.allTodos.length ||
    prevProps.currentTodo.id !== nextProps.currentTodo.id ||
    prevProps.isSideMenuHidden !== nextProps.isSideMenuHidden
  ) {
    return false
  }
  return true
}

/**
 * Accepts a parameter and returns it if it's a function
 * or a noop function if it's not. This allows us to
 * accept a callback, but not worry about it if it's not
 * passed.
 * @prop {Object} allTodos all of the todos
 * @prop {Object} currentTodo the current todo that's being edited
 * @prop {Function} todoMetaDispatch a function to dispatch events to the todo hook
 * @prop {Boolean} isSideMenuHidden self explanatory? 😳
 */ export default React.memo(
  props => (
    <aside className="menu">
      <button
        className="menu-head"
        aria-label={
          props.isSideMenuHidden
            ? 'Toggle to display menu'
            : 'Toggle to hide menu'
        }
        onClick={e =>
          props.todoUIDispatch({
            type: 'TOGGLE_MENU',
          })
        }
      >
        <h1>Menu</h1>
        <span>{props.isSideMenuHidden ? 'Show' : 'Hide'}</span>
      </button>

      <nav className="menu-body">
        <MenuSectionTitle>History</MenuSectionTitle>
        <History {...props} />
      </nav>
    </aside>
  ),
  areEqual
)
const MenuSectionTitle = styled.h1`
  margin: 0 0 10px 0;
  font-size: var(--fontxs);
  color: var(--white1);
  text-transform: uppercase;
`
