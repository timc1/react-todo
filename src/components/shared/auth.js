import React from 'react'
import styled from 'react-emotion'

import Modal from './modal'

export default ({ isShowing, toggleAuth }) => (
  <Modal isShowing={isShowing} toggleModal={toggleAuth}>
    <Container>hiii</Container>
  </Modal>
)

const Container = styled.div`
  position: absolute;
`
