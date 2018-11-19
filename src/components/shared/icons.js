import styled from 'react-emotion'

export const Pencil = styled.div`
  color: var(--white1);
  position: relative;
  margin-left: 0.25rem;
  margin-top: -0.25rem;
  width: 0.875rem;
  height: 0.25rem;
  border-radius: 0.0625rem;
  border: solid 0.0625rem currentColor;
  transform: rotate(-45deg);

  &::before {
    content: '';
    position: absolute;
    left: -0.75rem;
    top: -0.0625rem;
    width: 0px;
    height: 0px;
    border-left: solid 0.3125rem transparent;
    border-right: solid 0.3125rem currentColor;
    border-top: solid 0.125rem transparent;
    border-bottom: solid 0.125rem transparent;
  }
`

export const Trash = styled.div`
  color: var(--white1);
  position: relative;
  margin-top: 0.25rem;
  margin-left: auto;
  margin-right: auto;
  width: 0.625rem;
  height: 0.625rem;
  border-left: solid 0.0625rem currentColor;
  border-right: solid 0.0625rem currentColor;
  border-bottom: solid 0.0625rem currentColor;
  border-radius: 0 0 0.125rem 0.125rem;

  &::before {
    content: '';
    position: absolute;
    left: -0.1875rem;
    top: -0.125rem;
    width: 0.875rem;
    height: 0.0625rem;
    background-color: currentColor;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0px;
    top: -0.3125rem;
    width: 0.375rem;
    height: 0.125rem;
    border-left: solid 0.0625rem currentColor;
    border-right: solid 0.0625rem currentColor;
    border-top: solid 0.0625rem currentColor;
    border-radius: 0.25rem 0.25rem 0 0;
  }
`

export const Exit = styled.div`
  color: var(--white1);
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0;
  margin-left: 0;
  width: 21px;
  height: 21px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    width: 21px;
    height: 1px;
    background-color: currentColor;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`
