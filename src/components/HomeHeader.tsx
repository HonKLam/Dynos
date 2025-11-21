import { Text, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign'
import SearchButton from './Search/SearchButton'
import { useFlashListRef } from '@/hooks/useFlashListRef'
import { useMemoList } from '@/hooks/useMemoList'
import { useEffect } from 'react'
import { use$ } from '@legendapp/state/react'
import { currentMonth$, currentSectionIndex$ } from '@/state/ui.store'
import { useScrollToTop, useTheme } from '@react-navigation/native'

export default () => {
  const insets = useSafeAreaInsets()
  const ref = useFlashListRef()
  const { data } = useMemoList()
  const { colors } = useTheme()

  useScrollToTop(ref)

  useEffect(() => {
    getCurrentMonth()
  }, [])

  const currentMonth = use$(currentMonth$)

  const getCurrentMonth = () => {
    if (!data || data.length === 0) {
      currentMonth$.set('Home')
      return
    }

    const index = data.findIndex((predicate) => {
      if (typeof predicate === 'string') return true
    })

    currentMonth$.set(data[index] as string)
  }

  const scrollToNextSectionIndex = (): number => {
    if (!data || data.length === 0) return 0
    for (let i = currentSectionIndex$.get() + 1; i < data.length; i++) {
      if (typeof data[i] === 'string') {
        currentSectionIndex$.set(i)
        return i
      }
    }
    return currentSectionIndex$.get()
  }

  const scrollToPreviousSectionIndex = (): number => {
    if (!data || data.length === 0) return 0
    for (let i = currentSectionIndex$.get() - 1; i >= 0; i--) {
      if (typeof data[i] === 'string') {
        currentSectionIndex$.set(i)
        return i
      }
    }
    return currentSectionIndex$.get()
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.card }]}>
      <View style={styles.middle}>
        <TouchableOpacity
          onPress={() =>
            ref.current?.scrollToIndex({
              index: scrollToPreviousSectionIndex(),
              animated: true,
              viewOffset: 0,
              viewPosition: 0,
            })
          }
          hitSlop={20}
        >
          <AntDesign name="left-circle" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>{currentMonth}</Text>

        <TouchableOpacity
          onPress={() =>
            ref.current?.scrollToIndex({
              index: scrollToNextSectionIndex(),
              animated: true,
              viewOffset: 0,
              viewPosition: 0,
            })
          }
          hitSlop={20}
        >
          <AntDesign name="right-circle" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <SearchButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    width: '60%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 15,
  },
})
