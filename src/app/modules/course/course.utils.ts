export const calculateDurationInWeeks = (
  startDate: string,
  endDate: string,
): number => {
  // Parse the dates
  const start = new Date(startDate)
  const end = new Date(endDate)

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = end.getTime() - start.getTime()

  // Convert milliseconds to weeks (1 week = 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
  const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000
  const durationInWeeks = differenceInMilliseconds / millisecondsInAWeek

  // Return the duration in weeks, rounded up to the nearest integer
  return Math.ceil(durationInWeeks)
}
