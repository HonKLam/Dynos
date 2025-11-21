import { I18n } from 'i18n-js'

import { systemLanguageCode$ } from '@/state/ui.store'

import en from '@/locales/en.json'
import de from '@/locales/de.json'
import { LocaleConfig } from 'react-native-calendars'
import { generateLocaleData } from './calendarLocalData'

export const deviceLanguage = systemLanguageCode$.get()

export const i18n = new I18n({
  en,
  de,
})

i18n.enableFallback = true
i18n.defaultLocale = deviceLanguage
i18n.locale = deviceLanguage

// This is for react-native-calendars
const localeData = generateLocaleData(deviceLanguage)

LocaleConfig.locales[deviceLanguage] = {
  ...localeData,
}

LocaleConfig.defaultLocale = deviceLanguage
