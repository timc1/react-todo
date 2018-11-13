import styled from 'react-emotion'

export const Pencil = styled('div')`
  color: var(--white1);
  position: relative;
  margin-left: 4px;
  margin-top: 12px;
  width: 14px;
  height: 4px;
  border-radius: 1px;
  border: solid 1px currentColor;
  transform: rotate(-45deg);

  &::before {
    content: '';
    position: absolute;
    left: -12px;
    top: -1px;
    width: 0px;
    height: 0px;
    border-left: solid 5px transparent;
    border-right: solid 5px currentColor;
    border-top: solid 2px transparent;
    border-bottom: solid 2px transparent;
  }
`

export const Trash = styled('div')`
  color: var(--white1);
  position: relative;
  margin-left: 1px;
  margin-top: 15px;
  width: 10px;
  height: 10px;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
  border-bottom: solid 1px currentColor;
  border-radius: 0 0 2px 2px;

  &::before {
    content: '';
    position: absolute;
    left: -3px;
    top: -2px;
    width: 14px;
    height: 1px;
    background-color: currentColor;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0px;
    top: -5px;
    width: 6px;
    height: 3px;
    border-left: solid 1px currentColor;
    border-right: solid 1px currentColor;
    border-top: solid 1px currentColor;
    border-radius: 4px 4px 0 0;
  }
`
