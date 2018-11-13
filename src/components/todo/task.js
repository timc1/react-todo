import React from 'react'
import styled, { keyframes, css } from 'react-emotion'

export default React.memo(
  ({ isEditable, task, dispatch, setCurrentEditingTask }) => {
    return (
      <Container tabIndex="0">
        <Text isComplete={task.isComplete}>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
        </Text>

        <div className={controls}>
          <ul>
            <li>
              <button
                onClick={e => {
                  dispatch({ type: 'REMOVE_TASK', id: task.id })
                  setCurrentEditingTask(false)
                }}
              >
                Delete
              </button>
            </li>
            <li>
              <button onClick={e => setCurrentEditingTask(task)}>Edit</button>
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
  opacity: 0;
  transform: scale(0);
  transition-property: opacity, transform;
  transition: 0.15s var(--cubicbounce);
  transform-origin: 100%;
  color: var(--white1);
`

const Container = styled('div')`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  align-items: center;
  padding: 10px 0 20px 0;
  border-radius: var(--baseborderradius);
  outline: none;
  animation: ${slideUp} 0.15s ease-in;

  &:hover,
  &:focus {
    .${controls} {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Text = styled('div')`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    height: 1px;
    width: 100%;
    background: linear-gradient(
      150deg,
      #fcfcff 15%,
      #43dfff 70%,
      rgb(166, 255, 203) 94%
    );
    transform: ${props =>
      props.isComplete
        ? 'translateY(-50%) scaleX(1)'
        : 'translateY(-50%) scaleX(0)'};
    transition: 0.15s var(--cubic);
    transform-origin: 0 0;
  }
  h1,
  p {
    margin: 0;
    transition: opacity 0.25s var(--cubicbounce);
    opacity: ${props => (props.isComplete ? '0.2' : '1')};
  }

  h1 {
    font-size: var(--fontmd);
    font-family: var(--secondaryfont);
    color: var(--white1);
  }

  p {
    color: var(--black4);
  }
`
