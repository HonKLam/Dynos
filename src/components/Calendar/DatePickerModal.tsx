import React, { useState } from 'react'
import { use$ } from '@legendapp/state/react'
import { Text, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { systemLanguageTag$ } from '@/state/ui.store'
import { useTheme } from '@react-navigation/native'
import { observable } from '@legendapp/state'

export const setDisplayTime$ = observable<Date>(new Date())

export default () => {
  const [open, setOpen] = useState(false)
  const { colors } = useTheme()

  const currentDisplayTime = use$(setDisplayTime$)

  const languageTag = systemLanguageTag$.get()

  const dateTimeFormatter = new Intl.DateTimeFormat(languageTag, {
    dateStyle: 'short',
    timeStyle: 'short',
  })

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <Text style={{ color: colors.primary, fontSize: 18 }}>{`${dateTimeFormatter.format(currentDisplayTime)}`}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={currentDisplayTime}
        maximumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false)
          setDisplayTime$.set(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}
