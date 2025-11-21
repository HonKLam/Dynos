import { observable } from '@legendapp/state'
import { getCalendars, getLocales } from 'expo-localization'

export const searchBarKeyword$ = observable<string>('')
export const searchBarIsVisible$ = observable<boolean>(false)

export const currentSectionIndex$ = observable<number>(0)
export const currentMonth$ = observable<string>('')

export const systemLanguageCode$ = observable<string>(getLocales()[0].languageCode ?? 'en')
export const systemLanguageTag$ = observable<string>(getLocales()[0].languageTag ?? 'en-US')
export const systemTimeZone$ = observable<string>(getCalendars()[0].timeZone ?? 'Europe/Berlin')
