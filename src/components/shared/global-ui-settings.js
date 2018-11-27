import React, { useState, useRef } from 'react'
import styled from 'react-emotion'
import { PlainButton, PlainLinkExternal, fadein } from './styles'
import { Logo } from './icons'
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
      <Modal
        domElement="about-root"
        toggleModal={toggleAboutModal}
        isShowing={isAboutModalShowing}
      >
        <AboutContainer>
          <div className="logo-container">
            <Logo />
            <h1 className="logo-title">todoHQ</h1>
          </div>
          <h2>A super accessible and easy to use todo list.</h2>
          <ul>
            <li>
              <p>Update your tasks for today - plan your tasks for tomorrow.</p>
            </li>
            <li>
              <p>
                No account? Everything will be saved locally in your browser.
                Create an account to access your todo list anywhere.
              </p>
            </li>
            <Hr />
            <li>
              <p className="made-in">
                This project is a playground for new technologies, this one in
                particular uses React's new hooks API. The repo is available{' '}
                <PlainLinkExternal
                  href="https://github.com/timc1/react-todo"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Github - timc1 - view code"
                  style={{
                    cursor: 'ne-resize',
                  }}
                  tabIndex={isAboutModalShowing ? 0 : -1}
                >
                  here
                </PlainLinkExternal>
              </p>
            </li>
            <li>
              <p className="made-in">
                Made in sunny{' '}
                <span role="img" aria-label="palm tree emoji">
                  🌴
                </span>{' '}
                LA by{' '}
                <PlainLinkExternal
                  href="https://tcc.im?ref=todo_about"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View main website - tcc.im"
                  style={{
                    cursor: 'ne-resize',
                  }}
                  tabIndex={isAboutModalShowing ? 0 : -1}
                >
                  Tim Chang
                </PlainLinkExternal>
              </p>
            </li>
          </ul>
        </AboutContainer>
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
  background: var(--black1);
  transition: background 0.15s ease-in;
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
const AboutContainer = styled.div`
  //position: absolute;
  //top: 80px;
  //left: 50%;
  //transform: translateX(-50%);
  height: 500px;
  max-width: 500px;
  width: 100%;
  padding: 100px var(--basepadding);
  opacity: 0;
  animation: ${fadein} 0.15s ease-in;
  animation-fill-mode: forwards;
  animation-delay: 0.15s;

  .logo-container {
    display: grid;
    grid-gap: var(--fontxs);
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    .logo {
      height: var(--fontlg);
      width: var(--fontlg);
    }
    .logo-title {
      font-size: var(--fontlg);
      font-family: var(--secondaryfont);
      margin: 0;
    }
  }

  ul {
    position: relative;
  }
  h1,
  h2,
  p {
    color: var(--white1);
    margin: 20px 0;
  }
  h1,
  h2 {
    font-family: var(--secondaryfont);
  }
  h1 {
    font-size: var(--fontxl);
  }
  h2 {
    font-size: var(--fontmd);
  }
  p {
    font-size: var(--fontsm);
  }

  .made-in {
    font-size: var(--fontxs);
  }
`
const Hr = styled.hr`
  height: 1px;
  width: 100%;
  border: none;
  background: #eee;
  margin: 40px 0;
  &::before {
    content: '👋';
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(-53%);
    white-space: nowrap;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 900;
    letter-spacing: 1px;
    color: var(--white1);
    background: var(--black1);
    padding: 0px 8px;
  }
`
