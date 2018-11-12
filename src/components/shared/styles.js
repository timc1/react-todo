import styled from 'react-emotion'

export const StandardButton = styled('button')`
  white-space: nowrap;
  display: inline-block;
  height: 40px;
  line-height: 40px;
  padding: 0 14px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  background: var(--white1);
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-family: var(--secondaryfont);
  font-weight: var(--fontbold);
  text-transform: uppercase;
  letter-spacing: 0.025em;
  color: var(--black1);
  text-decoration: none;
  transition: all 0.15s ease;
  outline: none;
`
