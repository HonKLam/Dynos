import { BaseMemo, Memo } from '@/types/memo'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { use$ } from '@legendapp/state/react'
import { DateData, MarkedDates } from 'react-native-calendars/src/types'
import useMemoModal from './useMemoModal'
import { memoList$ } from '@/lib/api'
import { useRouter } from 'expo-router'
import { searchBarKeyword$, systemLanguageTag$ } from '@/state/ui.store'
import { useTheme } from '@react-navigation/native'

export default () => {
  const { isVisible, onModalOpen, handleSubmit, handleCancel, text, updateText } = useMemoModal()
  const router = useRouter()
  const { colors } = useTheme()

  const memos = use$(memoList$)
  const memoList = memos ? Object.values(memos) : []

  const { showActionSheetWithOptions } = useActionSheet()

  let markedDates: MarkedDates = {}

  const openActionSheet = (day: DateData) => {
    let options: string[]
    let cancelButtonIndex: number

    const incomingDay = new Date(day.dateString).toISOString().split('T')[0]
    const incomingDayLocale = new Date(day.dateString).toLocaleDateString(systemLanguageTag$.get())

    if (markedDates[incomingDay]?.selected === true) {
      options = ['New Memo', 'View Day', 'Cancel']
      cancelButtonIndex = 2
    } else {
      options = ['New Memo', 'Cancel']
      cancelButtonIndex = 1
    }

    showActionSheetWithOptions(
      {
        options: options,
        cancelButtonIndex: cancelButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === cancelButtonIndex) return

        switch (buttonIndex) {
          case 0: {
            onModalOpen('', new Date(day.dateString))
            break
          }
          case 1: {
            searchBarKeyword$.set(incomingDayLocale)
            router.push('/(tabs)')
          }
        }
      },
    )
  }

  memoList.forEach((memo: BaseMemo | Memo) => {
    markedDates[memo.localDisplayTime.toISOString().split('T')[0]] = {
      selected: true,
      selectedColor: colors.primary,
      disableTouchEvent: false,
    }
  })

  return {
    markedDates,
    openActionSheet,
    isVisible,
    handleSubmit,
    handleCancel,
    text,
    updateText,
  }
}
