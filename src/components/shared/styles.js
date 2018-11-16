import React from 'react'
import styled from 'react-emotion'

export const screenSm = 568
export const screenMd = 767
export const screenLg = 1440

const areEqual = (prevProps, nextProps) => {
  if (prevProps.content !== nextProps.content) return false
  return true
}

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
  `,
  areEqual
)

export const IconButton = styled(StandardButton)`
  font-size: var(--fontsm);

  .screen-reader {
    font-size: 0;
    opacity: 0;
    pointer-events: none;
  }
`
