import React from 'react'
import styled from 'react-emotion'

import Modal from './modal'

export default ({ isShowing, toggleAuth }) => {
  return (
    <Modal isShowing={isShowing} toggleModal={toggleAuth}>
      <Container>asdfadfs</Container>
    </Modal>
  )
}

const Container = styled.div`
  position: absolute;
`
