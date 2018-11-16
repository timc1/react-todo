import React, { useState, useEffect } from 'react'
import styled from 'react-emotion'

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
  ({ allTodos, todoMetaDispatch }) => {
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

    return days.showToday || days.showTomorrow ? (
      <ul>
        {days.showToday && (
          <li>
            <button>Today</button>
          </li>
        )}
        {days.showTomorrow && (
          <li>
            <button
              onClick={e => todoMetaDispatch({ type: 'ADD_TOMORROWS_TODO' })}
            >
              Tomorrow's list
            </button>
          </li>
        )}
      </ul>
    ) : (
      <P>
        Looks like you're good for now! You'll be able to add more dates
        tomorrow.
      </P>
    )
  },
  (prevProps, nextProps) =>
    prevProps.allTodos.length === nextProps.allTodos.length
)

const P = styled.p`
  margin: 0 0 20px 0;
  font-size: var(--fontxs);
  color: var(--black4);
`
