import styled from 'react-emotion'

export const StandardButton = styled('button')`
  position: relative;
  white-space: nowrap;
  display: inline-block;
  height: 40px;
  min-width: 40px;
  padding: 0 14px;
  background: transparent;
  border: 2px solid var(--white1);
  border-radius: var(--baseborderradius);
  font-size: 0;
  font-family: var(--secondaryfont);
  font-weight: var(--fontbold);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: var(--white1);
  opacity: 0.8;
  text-decoration: none;
  transition-property: transform, opacity;
  transition: 0.15s ease;
  outline: none;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--baseborderradius);
    transform-property: opacity, transform;
    transition: 0.15s ease;
    z-index: -1;
  }
  &::before {
    content: ${props => (props.content ? `"${props.content}"` : '')};
    color: var(--white1);
    font-size: var(--fontsm);
    vertical-align: middle;
  }
  &::after {
    content: '';
    box-shadow: 0 0 12px var(--white1);
    opacity: 0;
    transform: scale(1);
  }

  &:focus,
  &:active,
  &:hover {
    opacity: 1;
  }

  &:focus {
    &::after {
      opacity: 1;
      transform: scale(1.03);
    }
  }

  &:active {
    transform: translateY(1px);
    &::after {
      opacity: 1;
      transform: scale(1.03);
    }
  }
`
