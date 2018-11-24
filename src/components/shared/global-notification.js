import React from 'react'
import styled from 'react-emotion'

export default () => {
  return <Container>notif</Container>
}

const Container = styled.div`
  position: fixed;
  bottom: var(--basepadding);
  left: var(--basepadding);
  height: 200px;
  width: 200px;
  background: #eee;
`
