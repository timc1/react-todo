import React from 'react'
import styled, { keyframes } from 'react-emotion'

import useUser from './hooks/useUser'
import useDelay from './hooks/useDelay'

export default React.memo(({ children }, props) => {
  const { userContext } = useUser()

  const { delayedComponent } = useDelay({
    component: <LoadingScreen />,
    delayMs: 300,
    shouldCancel: userContext.state.isSettingUp === false,
  })

  return userContext.state.isSettingUp ? (
    delayedComponent
  ) : (
    <Container>
      <Header>
        <Nav>
          <ul>
            <li>TODO</li>
          </ul>
        </Nav>
      </Header>
      {children}
    </Container>
  )
})

const LoadingScreen = () => {
  return <LoadingContainer>Loading</LoadingContainer>
}

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Container = styled('div')`
  position: relative;
  max-width: var(--screenlg);
  margin: auto;
  overflow: hidden;
  animation: ${fadein} 0.25s ease-in;
`

const Header = styled('header')`
  padding: var(--basepadding);
`

const Nav = styled('nav')`
  ul {
    text-align: center;
  }
  li {
    display: inline-block;
    color: var(--white1);
  }
`

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
`
