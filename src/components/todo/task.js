import React from 'react'
import styled, { keyframes, css } from 'react-emotion'
import { IconButton, screenSm } from '../shared/styles'
import { Pencil, Trash } from '../shared/icons'

import Checkbox from './checkbox'

export default React.memo(
  ({ isEditable, task, dispatch, setCurrentEditingTask }) => {
    return (
      <Container tabIndex="0">
        <Text
          isComplete={task.isComplete}
          onClick={e =>
            dispatch({
              type: 'UPDATE_CURRENT_TODO_TASK',
              payload: {
                ...task,
                isComplete: !task.isComplete,
              },
            })
          }
        >
          <Checkbox isChecked={task.isComplete} className="checkbox" />
          <h1>{task.title}</h1>
          {task.description && <p>{task.description}</p>}
        </Text>

        <div className={controls}>
          <ul>
            <li>
              <IconButton onClick={e => setCurrentEditingTask(task)}>
                <Pencil />
                <span className="screen-reader">Edit Task {task.title}</span>
              </IconButton>
            </li>
            <li>
              <IconButton
                onClick={e => {
                  dispatch({ type: 'REMOVE_TASK', id: task.id })
                  setCurrentEditingTask(false)
                }}
              >
                <Trash />
                <span className="screen-reader">Delete Task {task.title}</span>
              </IconButton>
            </li>
          </ul>
        </div>
      </Container>
    )
  }
)

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`

const controls = css`
  li {
    display: inline-block;
  }
  //li:nth-child(even) {
  //  button {
  //    transition-delay: 0.05s;
  //  }
  //}
  li:not(:last-child) {
    margin-right: 10px;
  }

  li > button {
    opacity: 0;
    transform: scale(0.9);
    transition-property: opacity, transform;
    transition: 0.25s var(--cubicbounce);
    transform-origin: 100%;
    color: var(--white1);
    &:hover,
    &:focus {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: ${screenSm}px) {
    margin-right: -103px;
    scroll-snap-align: end;
    li > button {
      opacity: 1;
      transform: scale(1);
      &:hover,
      &:focus {
      }
    }
  }
`

const Container = styled('div')`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  align-items: center;
  padding: 0;
  margin-left: -5px;
  margin-right: -5px;
  border-radius: var(--baseborderradius);
  outline: none;
  animation: ${slideUp} 0.15s ease-in;

  &:hover,
  &:focus {
    .${controls} button {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: ${screenSm}px) {
    scroll-snap-type: x mandatory;
    grid-gap: 0;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
      opacity: 0;
    }
  }
`

const Text = styled('button')`
  border: 0;
  background: transparent;
  position: relative;
  padding: 20px 0 20px 35px;
  text-align: left;
  cursor: pointer;
  outline: none;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    height: 1px;
    width: calc(100% - 45px);
    background: var(--white2);
    transform: ${props =>
      props.isComplete
        ? 'translateY(-50%) scaleX(1)'
        : 'translateY(-50%) scaleX(0)'};
    transition: 0.15s var(--cubic);
    transform-origin: 0 0;
    transition-delay: 0.2s;
  }

  h1,
  p {
    margin: 0;
    transition: opacity 0.15s var(--cubicbounce);
    opacity: ${props => (props.isComplete ? '0.4' : '1')};
    word-break: break-word;
  }

  h1 {
    font-size: var(--fontmd);
    font-family: var(--secondaryfont);
    color: var(--white1);
  }

  p {
    font-size: var(--fontsm);
    color: var(--black4);
  }

  &:hover,
  &:active,
  &:focus {
    .checkbox {
      opacity: 1;
    }
  }

  &:focus {
    .checkbox {
      box-shadow: ${props =>
        props.isComplete ? '0' : '0 0 12px var(--white1)'};
    }
  }

  &:active {
    .checkbox {
      transform: translateY(calc(-50% + 1px));
    }
  }

  &::before {
    .checkbox {
      content: '';
    }
  }

  @media (max-width: ${screenSm}px) {
    scroll-snap-align: start;
  }
`
