import { BaseMemo, Memo } from '@/types/memo'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MemoContextMenu from '@/components/Memos/MemoContextMenu'
import useMemoListItem from '@/hooks/useMemoListItem'
import Markdown from 'react-native-markdown-display'
import { md, rules } from '@/lib/markdown-it'
import { useTheme } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { isMemo } from '@/lib/checkMemoType'

export default ({ memo }: { memo: BaseMemo | Memo }) => {
  const { convertToRelativeTimeFormat } = useMemoListItem()
  const { colors } = useTheme()

  const relativeTimeString = convertToRelativeTimeFormat(memo.localDisplayTime)

  const isLocal = !isMemo(memo)
  const isMemoEditedLocally = memo.isDirty

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.meta}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={{ color: colors.text, paddingRight: 5 }}>{relativeTimeString}</Text>
          {(isLocal || isMemoEditedLocally) && <Ionicons name="cloud-offline-outline" size={12} color={colors.text} />}
        </View>
        <MemoContextMenu memo={memo} />
      </View>
      <View style={styles.content}>
        <Markdown
          markdownit={md}
          rules={rules}
          style={{
            body: { color: colors.text },
            code_inline: { color: colors.text, backgroundColor: colors.background },
            code_block: { color: colors.text, backgroundColor: colors.background },
            fence: { color: colors.text, backgroundColor: colors.background },
          }}
        >
          {memo.content}
        </Markdown>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 15,
    padding: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  meta: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    height: '20%',
    marginBottom: 5,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
  },
})
