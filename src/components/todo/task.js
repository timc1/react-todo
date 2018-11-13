import React from 'react'
import styled, { keyframes, css } from 'react-emotion'

export default ({ isEditable, task, dispatch }) => {
  return (
    <Container tabIndex="0">
      <Text>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </Text>

      <div className={controls}>controls</div>
    </Container>
  )
}

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
`

const Container = styled('div')`
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 10px;
  align-items: center;
  margin-bottom: 10px;
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
  h1,
  p {
    margin: 0;
  }

  h1 {
    font-size: var(--fontmd);
    font-family: var(--secondaryfont);
  }
`
