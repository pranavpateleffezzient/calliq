export const formatDate = (date) => {
  return date.toISOString().split('T')[0]
}

// range marking generator
export const getRange = (start, end) => {
  let range = {}
  let current = new Date(start)

  while (current <= new Date(end)) {
    const date = formatDate(current)
    range[date] = { color: '#0A4EDC', textColor: 'white' }
    current.setDate(current.getDate() + 1)
  }

  return range
}
