import React, { useState, useEffect } from 'react'
import styled from 'react-emotion'
import { PlainButton, fadein } from '../shared/styles'

import arrowRight from '../../images/arrow-right.svg'

const calculateWhichDaysToDisplay = allTodos => {
  const today = new Date(new Date().toDateString())
  const calculated = {
    showToday: true,
    showTomorrow: true,
  }
  allTodos.forEach(todo => {
    const date = new Date(todo.date)
    if (date.getDay() === today.getDay()) {
      calculated.showToday = false
    } else if (date > today) {
      calculated.showTomorrow = false
    }

    // exit forEach when both showToday and showTomorrow props are false
    if (!calculated.showToday && !calculated.showTomorrow) return
  })
  return calculated
}

export default React.memo(
  ({ allTodos, todoMetaDispatch, isSideMenuHidden }) => {
    const [days, setDays] = useState(calculateWhichDaysToDisplay(allTodos))

    useEffect(
      () => {
        const updatedDays = calculateWhichDaysToDisplay(allTodos)
        // Days is already set on the first render - so this will prevent 2 renders on the first render.
        if (JSON.stringify(updatedDays) !== JSON.stringify(days)) {
          setDays(updatedDays)
        }
      },
      [allTodos]
    )

    return (
      <Ul>
        {days.showToday && (
          <li>
            <Button
              onClick={e => todoMetaDispatch({ type: 'ADD_TODAYS_TODO' })}
              tabIndex={isSideMenuHidden ? -1 : 0}
            >
              <span>Create a list for today</span>
            </Button>
          </li>
        )}
        {days.showTomorrow && (
          <li>
            <Button
              onClick={e => todoMetaDispatch({ type: 'ADD_TOMORROWS_TODO' })}
              tabIndex={isSideMenuHidden ? -1 : 0}
            >
              <span>Plan tomorrow's list</span>
            </Button>
          </li>
        )}
        {!days.showToday &&
          !days.showTomorrow && (
            <P>
              Looks like you're good for now! You'll be able to add more dates
              tomorrow.
            </P>
          )}
      </Ul>
    )
  },
  (prevProps, nextProps) => {
    return (
      prevProps.allTodos.length === nextProps.allTodos.length &&
      prevProps.isSideMenuHidden === nextProps.isSideMenuHidden
    )
  }
)

const Ul = styled.ul`
  margin: 0 0 20px 0;
  display: grid;
  grid-gap: 10px;
`

const P = styled.p`
  margin: 0;
  font-size: var(--fontxs);
  color: var(--black4);
  animation: ${fadein} 0.15s ease-in;
`

const Button = styled(PlainButton)`
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    margin-left: 10px;
    background: var(--white1);
    height: var(--fontxs);
    width: var(--fontxs);
    -webkit-mask: url(${arrowRight}) center / contain no-repeat;
    mask: url(${arrowRight}) center / contain no-repeat;
    transition: transform 0.15s ease-in;

    transform: translate(0, -50%);
  }
  > span {
    opacity: 0.7;
    transition: opacity 0.15s ease-in;
  }

  &:hover,
  &:focus {
    > span {
      opacity: 1;
    }
    &::after {
      transform: translate(8px, -50%);
    }
  }

  &:active {
    > span {
      opacity: 0.7;
    }
    &::after {
      transform: translate(4px, -50%);
    }
  }
`
