import React from 'react'
import styled, { keyframes } from 'react-emotion'
import { screenMd } from '../shared/styles'
import { Loader } from '../shared/icons'

import TodoEditor from './todo-editor'
import Menu from './menu'

import useTodo, { useTodoUI } from '../shared/hooks/useTodo'
import useLocalStorage from '../shared/hooks/useLocalStorage'
import useUser from '../shared/hooks/useUser'

export default () => {
  // Setup.
  // 1. Check for user.
  // 2. If user exists, useTodo will update data via API
  // 3. If no user exists, useTodo will update data via localStorage
  const { userContext } = useUser()

  const {
    isTodosLoading,
    getAllTodos,
    getCurrentTodo,
    todoMeta,
    todoMetaDispatch,
  } = useTodo({
    user: userContext.state.user,
  })

  // Enables us to save the todo_meta in localStorage, for users not logged in.
  // Logged in users will fetch data from our DB, so we pass false to shouldUpdate
  // if we have a user from userContext.
  useLocalStorage({
    name: 'todo_meta',
    objectToUpdate: todoMeta,
    enableDebounce: true,
    shouldUpdate: !userContext.state.user,
  })

  // Enables an interactive UI experience.
  const { uiSettings, todoUIDispatch } = useTodoUI()
  // Enables us to save UI settings in localStorage.
  // Users UI settings will never be saved in the DB, so we pass
  // shouldUpdate equal to true.
  useLocalStorage({
    name: 'todos_ui_settings',
    objectToUpdate: uiSettings,
    enableDebounce: true,
    shouldUpdate: true,
  })

  const currentTodo = getCurrentTodo()
  const allTodos = getAllTodos()

  return isTodosLoading ? (
    <LoaderContainer>
      <Loader isShowing={true} />
    </LoaderContainer>
  ) : (
    <>
      {uiSettings && (
        <Container {...uiSettings}>
          <Menu
            allTodos={allTodos}
            currentTodo={currentTodo}
            todoMetaDispatch={todoMetaDispatch}
            todoUIDispatch={todoUIDispatch}
            isSideMenuHidden={uiSettings.isSideMenuHidden}
          />
          <TodoEditor
            currentTodo={currentTodo}
            todoMetaDispatch={todoMetaDispatch}
          />
        </Container>
      )}
    </>
  )
}

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slidein = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const LoaderContainer = styled.div`
  display: flex;
  place-content: center;
  opacity: 0;
  animation: ${fadein} 0.25s ease-in;
  animation-fill-mode: forwards;
  animation-delay: 0.3s;
`

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 10rem) 1fr;
  grid-gap: 40px;
  align-items: start;
  padding: 0 var(--basepadding);
  opacity: 0;
  animation: ${slidein} 0.25s ease-in;
  animation-fill-mode: forwards;

  .menu {
    max-width: 10rem;
    width: 100%;
    z-index: 1;

    .menu-head {
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
          ? 'rotate(90deg) translateX(11px)'
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
        opacity: 0.7;
        align-self: center;
        transition: opacity 0.15s ease-in;
      }

      &:hover,
      &:focus {
        opacity: 1;
        span {
          opacity: 1;
        }
      }

      &:active {
        span {
          opacity: 0.7;
        }
      }
    }
    .menu-body {
      transform: ${props =>
        props.isSideMenuHidden ? 'translateY(100px)' : 'translateY(0)'};
      opacity: ${props => (props.isSideMenuHidden ? '0' : '1')};
      transition-property: transform, opacity;
      transition: 0.25s ease-in;
      transition-delay: ${props => (props.isSideMenuHidden ? '0' : '0.25s')};
      pointer-events: ${props => (props.isSideMenuHidden ? 'none' : 'initial')};
      padding: 34px 10px;
      margin: 0 -11px;
      max-height: calc(100vh - 60px);
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
    padding: 0 0.9375rem;

    .menu {
      position: absolute;
      top: 42px;
      left: 0.9375rem;
      .menu-head {
        margin-top: -110px;
        transform: none;
      }
    }

    .todo-editor {
      transform: ${props =>
        props.isSideMenuHidden ? 'translateX(0px)' : 'translateX(180px)'};
    }
  }
`
