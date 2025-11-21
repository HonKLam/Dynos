import { useState } from 'react'
import { use$ } from '@legendapp/state/react'

import { refreshMemoList } from '@/lib/memo-crud'
import { BaseMemo, Memo } from '@/types/memo'
import { searchBarKeyword$, systemLanguageCode$, systemLanguageTag$ } from '@/state/ui.store'
import { memoList$ } from '@/lib/api'
import { useFlashListRef } from './useFlashListRef'
import { currentMonth$, currentSectionIndex$ } from '@/state/ui.store'
import { ViewToken } from '@shopify/flash-list'

export function useMemoList() {
  const memos = use$(memoList$)
  const searchBarKeyword: string = use$(searchBarKeyword$)

  const [refreshing, setRefreshing] = useState(false)
  const ref = useFlashListRef()

  const languageTag = systemLanguageTag$.get()
  const languageCode = systemLanguageCode$.get()

  const dateTimeFormatter = new Intl.DateTimeFormat(languageCode, { month: 'long', year: 'numeric' })

  function onRefresh() {
    setRefreshing(true)
    setTimeout(() => {
      refreshMemoList()
      setRefreshing(false)
    }, 1000)
  }

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<string | BaseMemo | Memo>[]
    changed: ViewToken<string | BaseMemo | Memo>[]
  }) => {
    const firstVisibleString = viewableItems.find((v) => typeof v.item === 'string')
    const firstVisibleStringIndex = firstVisibleString?.index

    if (firstVisibleStringIndex !== undefined && firstVisibleStringIndex !== null) {
      currentSectionIndex$.set(firstVisibleStringIndex)
      currentMonth$.set(firstVisibleString?.item as string)
    }
  }

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // consider item visible if 50% is visible
    minimumViewTime: 0,
  }

  const memosArray = memos ? Object.values(memos) : []
  const filteredMemosArray = memosArray.filter((memo: BaseMemo | Memo) => {
    return (
      memo.content.toLowerCase().includes(searchBarKeyword.toLowerCase()) ||
      memo.localDisplayTime.toLocaleDateString(languageTag).includes(searchBarKeyword.toLowerCase())
    )
  })
  const sortedMemosArray = filteredMemosArray.sort(
    (a, b) => b.localDisplayTime.getTime() - a.localDisplayTime.getTime(),
  )

  const memosArraysBasedOnMonth = sortedMemosArray.reduce((acc: Record<string, (BaseMemo | Memo)[]>, cur) => {
    const label = dateTimeFormatter.format(cur.localDisplayTime)

    // If no property "customLabel" wihtin acc object, create new Array within the acc object for this "customLabel"-Property
    if (!acc[label]) {
      acc[label] = []
    }

    // Push the current value into existing property or newly created property
    acc[label].push(cur)
    return acc
  }, {})

  const data = Object.entries(memosArraysBasedOnMonth).map(([month, memos]) => ({
    title: month,
    data: memos,
  }))

  const flatData: (string | BaseMemo | Memo)[] = data.flatMap((section) => [section.title, ...section.data])

  return {
    refreshing,
    onRefresh,
    data: flatData,
    ref,
    onViewableItemsChanged,
    viewabilityConfig,
  }
}
