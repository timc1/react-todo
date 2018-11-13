import React from 'react'
import styled from 'react-emotion'
import check from '../../images/check.svg'

export default ({ isChecked, className }) => (
  <Container className={className} isChecked={isChecked} />
)

const Container = styled('span')`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  height: 20px;
  width: 20px;
  border: 2px solid
    ${props => (props.isChecked ? 'var(--white4)' : 'var(--white2)')};
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transform-property: opacity, transform, border-color;
  transition: 0.15s var(--cubic);
  opacity: 0.8;

  &:hover,
  &:active,
  &:focus {
    opacity: 1;
  }

  &:focus {
    box-shadow: ${props => (props.isChecked ? '0' : '0 0 12px var(--white1)')};
  }

  &:active {
    transform: translateY(calc(-50% + 1px));
  }

  &::before {
    content: '';
    position: absolute;
    height: 20px;
    width: 20px;
    left: 0px;
    margin-top: -5px;
    background: #f7fffd;
    -webkit-mask: url(${check}) center bottom / contain no-repeat;
    transform-property: opacity, transform;
    transition: 0.25s var(--cubicbounce);
    transform: ${props => (props.isChecked ? 'scale(1)' : 'scale(0)')};
    transform-origin: 50%;
    opacity: ${props => (props.isChecked ? '1' : '0')};
  }
`
