import { useMemoList } from '@/hooks/useMemoList'
import { memoListLocal$ } from '@/lib/api'
import { deleteAllMemos } from '@/lib/memo-crud'
import { secureStoreGet } from '@/lib/secureStore'
import { apiUrl$ } from '@/state/auth.store'
import { use$ } from '@legendapp/state/react'
import { useTheme } from '@react-navigation/native'
import { Button, Text, ScrollView } from 'react-native'

export default () => {
  const apiUrl = use$(apiUrl$)
  const { colors } = useTheme()

  const { data } = useMemoList()
  const memoListLocal = use$(memoListLocal$)

  const accessToken = secureStoreGet('apiAccessToken')

  return (
    <ScrollView>
      <Button onPress={deleteAllMemos} title="Nuke All Memos" />
      <Text style={{ color: colors.text }}>{apiUrl}</Text>
      <Text style={{ color: colors.text }}>{accessToken}</Text>
    </ScrollView>
  )
}
