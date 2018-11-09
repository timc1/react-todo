import React from 'react'
import styled from 'react-emotion'

export default ({ children }, props) => {
  return (
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
}

const Container = styled('div')`
  max-width: var(--screenlg);
  margin: auto;
`

const Header = styled('header')`
  padding: var(--basepadding);
`

const Nav = styled('nav')`
  li {
    display: inline-block;
  }
`
