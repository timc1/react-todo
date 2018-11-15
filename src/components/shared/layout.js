import React from 'react'
import styled from 'react-emotion'

export default React.memo(({ children }, props) => {
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
})

const Container = styled('div')`
  max-width: var(--screenlg);
  margin: auto;
  overflow: hidden;
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
