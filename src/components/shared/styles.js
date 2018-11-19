import React from 'react'
import styled from 'react-emotion'

export const screenSm = 568
export const screenMd = 767
export const screenLg = 1440

const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.content !== nextProps.content ||
    prevProps.tabIndex !== nextProps.tabIndex ||
    prevProps.disabled !== nextProps.disabled
  )
    return false
  return true
}

const resetProps = `
  position: relative;
  border: 0; 
  padding: 5px 0;
  margin: 0;
  background none;
  color: var(--white1);
  font-size: var(--fontxs);
  text-align: left;
  cursor: pointer;
  transition: opacity 0.15s ease-in;
  .screen-reader {
    display: none;
    font-size: 0;
    opacity: 0;
    pointer-events: none;
  }
  &:disabled {
    opacity: 0.3 !important;
    cursor: progress;
  }
`

export const StandardButton = React.memo(
  styled('button')`
    position: relative;
    white-space: nowrap;
    display: inline-block;
    height: 2.5rem;
    min-width: 2.5rem;
    padding: 0 0.875rem;
    background: transparent;
    border: 0.125rem solid var(--white1);
    border-radius: var(--baseborderradius);
    font-size: 0;
    font-family: var(--secondaryfont);
    font-weight: var(--fontbold);
    letter-spacing: 0.025em;
    color: var(--white1);
    opacity: 0.8;
    text-decoration: none;
    transition-property: transform, opacity;
    transition: 0.15s ease;
    vertical-align: middle;
    outline: none;
    cursor: pointer;
    &:disabled {
      opacity: 0.3 !important;
      cursor: progress;
    }
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
      text-transform: uppercase;
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

    .screen-reader {
      display: none;
      font-size: 0;
      opacity: 0;
      pointer-events: none;
    }
  `,
  areEqual
)

export const IconButton = styled(StandardButton)`
  font-size: var(--fontsm);
`

export const PlainButton = styled.button`
  ${resetProps};
`

export const ExitButton = React.memo(
  styled.button`
    ${resetProps};
    height: 30px;
    width: 30px;
    margin-top: 15px;
    margin-left: 15px;
    border-radius: var(--baseborderradius);
    outline: none;
    > div {
      opacity: 0.7;
    }
    > span {
      display: none;
    }
    &::after {
      content: '';
      box-shadow: 0 0 12px var(--white1);
      border-radius: 50%;
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      transform: scale(0.7);
      transition: transform 0.1s ease-in;
    }

    &:hover {
      > div {
        opacity: 1;
      }
    }

    &:focus {
      &::after {
        opacity: 1;
        transform: scale(1.05);
      }
    }

    &:active {
      > div {
        opacity: 0.7;
      }
      &::after {
        opacity: 0.7;
        transform: scale(0.95);
      }
    }
  `,
  areEqual
)
