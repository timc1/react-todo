import React from 'react'

import { formatDate } from '../../utils'

import styled from 'react-emotion'

export default React.memo(({ date }) => {
  let text = formatDate(date)

  return <H1>{text}</H1>
})

const H1 = styled('h1')`
  font-family: var(--secondaryfont);
  font-size: var(--fontsm);
  color: var(--white1);
  margin: 0 0 20px 0;
`
