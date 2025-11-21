import '@formatjs/intl-getcanonicallocales/polyfill'
import '@formatjs/intl-locale/polyfill'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/locale-data/en'

import '@formatjs/intl-pluralrules/locale-data/en'
import '@formatjs/intl-relativetimeformat/locale-data/de'

import { systemLanguageTag$, systemTimeZone$ } from '@/state/ui.store'

export default () => {
  const convertToRelativeTimeFormat = (date: Date): string => {
    const languageTag = systemLanguageTag$.get()
    const deviceTimezone = systemTimeZone$.get()

    const deltaSeconds = Math.round((date.getTime() - Date.now()) / 1000)
    const deltaDays = Math.round(deltaSeconds / 86400)

    const datePart = new Intl.DateTimeFormat(languageTag, {
      weekday: deltaDays !== 0 && deltaDays !== -1 ? 'long' : undefined,
      month: 'short',
      day: 'numeric',
      timeZone: deviceTimezone,
    }).format(date)

    // "Today, Date" or "Yesterday, Date", else just display weekday, Date
    if (deltaDays === 0 || deltaDays === -1) {
      const rtf = new Intl.RelativeTimeFormat(languageTag, { numeric: 'auto' })

      let relative = rtf.format(deltaDays, 'day')
      relative = relative.charAt(0).toUpperCase() + relative.slice(1)

      return `${relative}, ${datePart}`
    }

    return datePart
  }

  return { convertToRelativeTimeFormat }
}
