export function generateLocaleData(locale: string) {
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' })
  const monthShortFormatter = new Intl.DateTimeFormat(locale, { month: 'short' })
  const dayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'long' })
  const dayShortFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })

  const monthNames = []
  const monthNamesShort = []

  for (let i = 0; i < 12; i++) {
    const date = new Date(2020, i, 1)

    monthNames.push(monthFormatter.format(date))
    monthNamesShort.push(monthShortFormatter.format(date))
  }

  const dayNames = []
  const dayNamesShort = []

  for (let i = 0; i < 7; i++) {
    const date = new Date(2020, 0, 5 + i)

    dayNames.push(dayFormatter.format(date))
    dayNamesShort.push(dayShortFormatter.format(date))
  }

  return { monthNames, monthNamesShort, dayNames, dayNamesShort }
}
