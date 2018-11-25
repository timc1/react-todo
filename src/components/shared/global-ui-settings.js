import React, { useState, useRef } from 'react'
import styled from 'react-emotion'
import { PlainButton } from './styles'
import useOuterClick from './hooks/useOuterClick'

export default () => {
  const popupRef = useRef()
  const [isPopupShowing, togglePopup] = useState(false)

  useOuterClick({
    ref: popupRef,
    isShowing: isPopupShowing,
    toggle: togglePopup,
  })

  return (
    <Container>
      <PlainButton onClick={e => togglePopup(!isPopupShowing)}>
        Settings
      </PlainButton>
      <Popup innerRef={popupRef} isShowing={isPopupShowing}>
        <li>
          <ColorPicker />
        </li>
      </Popup>
    </Container>
  )
}

const ColorPicker = () => {
  return <div>hihihihi</div>
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 15px;
  background: var(--black1);
`

const Popup = styled.ul`
  background: var(--black1);
  border: 2px solid var(--white3);
  border-radius: var(--baseborderradius);
  box-shadow: 0 0 12px var(--black4);
  position: absolute;
  bottom: 45px;
  right: 15px;
  width: 180px;
  transition-property: transform, opacity;
  opacity: ${props => (props.isShowing ? 1 : 0)};
  transform: ${props =>
    props.isShowing ? 'scale(1) translateY(0)' : 'scale(.5) translateY(10px)'};
  transform-origin: 100% 0;
  transition: 0.25s var(--cubicbounce);
  pointer-events: ${props => (props.isShowing ? 'initial' : 'none')};
`
