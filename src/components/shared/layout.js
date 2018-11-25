import React from 'react'
import styled, { keyframes } from 'react-emotion'

import useUser from './hooks/useUser'
import useDelay from './hooks/useDelay'

import Nav from './nav'
import GlobalNotification from './global-notification'
import GlobalUISettings from './global-ui-settings'

import { Loader } from './icons'

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
      <Nav user={userContext.state.user} />
      {children}
      <GlobalNotification />
      <GlobalUISettings />
    </Container>
  )
})

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <Loader isShowing={true} />
    </LoadingContainer>
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

const Container = styled('div')`
  position: relative;
  max-width: var(--screenlg);
  margin: auto;
  overflow: hidden;
  animation: ${fadein} 0.25s ease-in;
  min-height: 400px;
`

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
`
