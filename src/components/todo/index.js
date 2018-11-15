import React from 'react'
import styled from 'react-emotion'
import { screenMd } from '../shared/styles'

import TodoEditor from './todo-editor'
import History from './history'

import useTodo, { useTodoUI } from '../shared/hooks/useTodo'
import useLocalStorage from '../shared/hooks/useLocalStorage'

export default React.memo(() => {
  // Setup.
  const { getAllTodos, getCurrentTodo, todoMeta, todoMetaDispatch } = useTodo({
    user: false,
  })
  useLocalStorage({
    name: 'todo_meta',
    objectToUpdate: todoMeta,
    enableDebounce: true,
  })

  // Enables an interactive UI experience.
  const { uiSettings, todoUIDispatch } = useTodoUI()
  // Enables us to save UI settings in localStorage.
  useLocalStorage({
    name: 'todos_ui_settings',
    objectToUpdate: uiSettings,
    enableDebounce: true,
  })

  return (
    <>
      {uiSettings && (
        <Container {...uiSettings}>
          <History
            allTodos={todoMeta.todos}
            todoMetaDispatch={todoMetaDispatch}
            todoUIDispatch={todoUIDispatch}
            isSideMenuHidden={uiSettings.isSideMenuHidden}
          />
          <TodoEditor
            currentTodo={getCurrentTodo()}
            todoMetaDispatch={todoMetaDispatch}
          />
        </Container>
      )}
    </>
  )
})

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 40px;
  align-items: start;
  padding: 0 var(--basepadding);

  .history {
    z-index: 1;

    .history-head {
      position: relative;
      background: none;
      border: none;
      padding: 10px 0;
      margin-top: -10px;
      display: flex;
      align-items: start;
      cursor: pointer;
      opacity: ${props => (props.isSideMenuHidden ? '.5' : '1')};
      transform: ${props =>
        props.isSideMenuHidden
          ? 'rotate(90deg) translateX(10px)'
          : 'rotate(0) translateX(0)'};
      transform-origin: 0 0;
      transition: 0.25s ease-in;
      transition-property: transform, opacity;
      z-index: 2;

      h1 {
        font-size: var(--fontsm);
        font-family: var(--secondaryfont);
        font-weight: var(--fontbold);
        color: var(--white1);
        margin: 0 10px 0 0;
      }
      span {
        font-size: var(--fontxs);
        color: var(--white1);
        border-radius: var(--baseborderradius);
        text-transform: uppercase;
        opacity: 0.8;
        align-self: center;
      }

      &:hover,
      &:active,
      &:focus {
        opacity: 1;
        span {
          opacity: 1;
        }
      }
    }
    .history-body {
      transform: ${props =>
        props.isSideMenuHidden ? 'translateY(100px)' : 'translateY(0)'};
      opacity: ${props => (props.isSideMenuHidden ? '0' : '1')};
      transition-property: transform, opacity;
      transition: 0.25s ease-in;
      transition-delay: ${props => (props.isSideMenuHidden ? '0' : '0.25s')};
      pointer-events: ${props => (props.isSideMenuHidden ? 'none' : 'initial')};
      background: var(--black1);

      max-height: calc(100vh - 120px);
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      &::-webkit-scrollbar {
        display: none;
      }
      button {
        width: 100%;
      }
    }

    &:hover,
    &:active,
    &:focus {
      opacity: 1;
    }
  }

  .todo-editor {
    position: relative;
    transform: ${props =>
      props.isSideMenuHidden ? 'translateX(-150px)' : 'translateX(0)'};
    transition-property: transform;
    transition: 0.25s ease-in;
    transition-delay: ${props => (props.isSideMenuHidden ? '0.25s' : '0')};
    z-index: 2;
  }

  @media (max-width: ${screenMd}px) {
    display: block;
    padding: 0 15px;

    .history {
      position: absolute;
      top: 40px;
      left: 15px;
      .history-head {
        transform: none;
      }
    }

    .todo-editor {
      transform: ${props =>
        props.isSideMenuHidden ? 'translateX(0px)' : 'translateX(180px)'};
    }
  }
`
