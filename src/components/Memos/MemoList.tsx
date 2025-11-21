import { RefreshControl, StyleSheet } from 'react-native'
import { FlashList } from '@shopify/flash-list'

import MemoListItem from '@/components/Memos/MemoListItem'
import { useMemoList } from '@/hooks/useMemoList'
import MemoListSectionHeader from './MemoListSectionHeader'
import { useTheme } from '@react-navigation/native'

export default () => {
  const { refreshing, onRefresh, data, ref, onViewableItemsChanged, viewabilityConfig } = useMemoList()
  const { colors } = useTheme()

  return (
    <FlashList
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      ref={ref}
      style={styles.memoList}
      data={data}
      extraData={data}
      keyExtractor={(item) => (typeof item === 'string' ? `header-${item}` : item.id)}
      renderItem={({ item }) => {
        if (typeof item === 'string') {
          return <MemoListSectionHeader title={item} />
        } else {
          return <MemoListItem memo={item} />
        }
      }}
      getItemType={(item) => {
        return typeof item === 'string' ? 'sectionHeader' : 'row'
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.text}
          title="Refresh Memos"
          titleColor={colors.text}
        />
      }
      showsVerticalScrollIndicator={true}
    />
  )
}

const styles = StyleSheet.create({
  memoList: {
    zIndex: -1,
  },
})
