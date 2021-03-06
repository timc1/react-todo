import React from 'react'
import styled from 'react-emotion'

import History from './history'
import AddDate from './add-date'

import { fadein } from '../shared/styles'

/**
 * Accepts a parameter and returns it if it's a function
 * or a noop function if it's not. This allows us to
 * accept a callback, but not worry about it if it's not
 * passed.
 * @prop {Object} allTodos all of the todos
 * @prop {Object} currentTodo the current todo that's being edited
 * @prop {Function} todoMetaDispatch a function to dispatch events to the todo hook
 * @prop {Boolean} isSideMenuHidden self explanatory? 😳
 */ export default props => (
  <aside
    className="menu"
    aria-expanded={!props.isSideMenuHidden}
    aria-haspopup="listbox"
  >
    <MenuToggler {...props} />
    <nav className="menu-body" role="listbox">
      <MenuSectionTitle>Actions</MenuSectionTitle>
      <AddDate {...props} />
      <MenuSectionTitle>History</MenuSectionTitle>
      <History {...props} />
    </nav>
  </aside>
)
const MenuToggler = React.memo(
  props => (
    <button
      className="menu-head"
      onClick={e =>
        props.todoUIDispatch({
          type: 'TOGGLE_MENU',
        })
      }
      aria-label={
        props.isSideMenuHidden ? 'Toggle to open menu' : 'Toggle to close menu'
      }
      aria-haspopup="true"
    >
      <h1>Menu</h1>
      <span>{props.isSideMenuHidden ? 'Show' : 'Hide'}</span>
    </button>
  ),
  (prevProps, nextProps) =>
    prevProps.isSideMenuHidden === nextProps.isSideMenuHidden
)
const MenuSectionTitle = React.memo(styled.h1`
  margin: 0 0 10px 0;
  font-size: var(--fontxs);
  color: var(--white1);
  text-transform: uppercase;
  animation: ${fadein} 0.15s ease-in;
`)
