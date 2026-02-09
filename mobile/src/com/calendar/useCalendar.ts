import { useState } from 'react'
import { formatDate, getRange } from './helpers'

export default function useCalendar(mode = 'single') {
  const [selected, setSelected] = useState({})
  const [startDate, setStartDate] = useState(null)

  const onDayPress = (day) => {
    const date = day.dateString

    // SINGLE DATE
    if (mode === 'single') {
      setSelected({
        [date]: { selected: true }
      })
    }

    // MULTI DATE
    if (mode === 'multi') {
      setSelected(prev => ({
        ...prev,
        [date]: {
          selected: !prev[date]
        }
      }))
    }

    // RANGE DATE
    if (mode === 'range') {
      if (!startDate) {
        setStartDate(date)
        setSelected({
          [date]: { startingDay: true, color: '#0A4EDC', textColor: 'white' }
        })
      } else {
        const range = getRange(startDate, date)
        setSelected(range)
        setStartDate(null)
      }
    }
  }

  return { selected, onDayPress, setSelected }
}
