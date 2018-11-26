import React, { useState, useRef } from 'react'
import styled from 'react-emotion'
import { PlainButton } from './styles'
import useOuterClick from './hooks/useOuterClick'
import useGlobalUI from './hooks/useGlobalUI'
import Modal from './modal'

export default () => {
  const popupRef = useRef()
  const [isPopupShowing, togglePopup] = useState(false)
  const [isAboutModalShowing, toggleAboutModal] = useState(false)

  useOuterClick({
    ref: popupRef,
    isShowing: isPopupShowing,
    toggle: togglePopup,
  })

  return (
    <Container>
      <Button onClick={e => togglePopup(!isPopupShowing)}>Settings</Button>
      <Popup innerRef={popupRef} isShowing={isPopupShowing}>
        <li>
          <p>Night mode:</p>
          <ColorPicker isShowing={isPopupShowing} />
        </li>
      </Popup>
      <Button onClick={e => toggleAboutModal(!isAboutModalShowing)}>?</Button>
      <Modal isShowing={isAboutModalShowing} toggleModal={toggleAboutModal}>
        lksdjalkdjfalksjdf!!
      </Modal>
    </Container>
  )
}

const ColorPicker = ({ isShowing }) => {
  const { uiContext: context } = useGlobalUI()
  return (
    <Button
      tabIndex={isShowing ? 0 : -1}
      onClick={e =>
        context.dispatchUI({
          type: context.state.value.colorTheme === 'dark' ? 'light' : 'dark',
        })
      }
    >
      {context.state.value.colorTheme === 'dark' ? 'On' : 'Off'}
    </Button>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;
`

const Popup = styled.ul`
  background: var(--black1);
  border: 2px solid var(--white3);
  border-radius: var(--baseborderradius);
  box-shadow: 0 0 12px var(--black4);
  position: absolute;
  bottom: 60px;
  right: 45px;
  width: 180px;
  transition-property: transform, opacity;
  opacity: ${props => (props.isShowing ? 1 : 0)};
  transform: ${props =>
    props.isShowing ? 'scale(1) translateY(0)' : 'scale(.5) translateY(10px)'};
  transform-origin: 100% 0;
  transition: 0.25s var(--cubicbounce);
  pointer-events: ${props => (props.isShowing ? 'initial' : 'none')};
  li {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 5px;
    align-items: center;
    padding-left: 10px;
  }

  p {
    margin: 0;
    font-size: var(--fontxs);
    color: var(--white1);
  }
`

const Button = styled(PlainButton)`
  padding: 10px;
  text-transform: uppercase;
`
