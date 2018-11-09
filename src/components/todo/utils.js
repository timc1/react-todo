export const formatDate = date => {
  const d = new Date(date)

  if (d.toString().toUpperCase() !== 'INVALID DATE') {
    return `${d
      .toDateString()
      .split(' ')
      .splice(0, 4)
      .join(' ')}`
  } else {
    return null
  }
}
