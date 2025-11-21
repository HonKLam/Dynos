import { View, StyleSheet } from 'react-native'

import { use$ } from '@legendapp/state/react'

import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { syncObservable } from '@legendapp/state/sync'

import Login from '@/components/Login'
import MemoCreateButton from '@/components/Memos/MemoCreateButton'
import SearchBarAnimated from '@/components/Search/SearchBarAnimated'
import MemoList from '@/components/Memos/MemoList'
import { hasLaunched$ } from '@/state/app.store'

syncObservable(hasLaunched$, {
  persist: {
    name: 'hasLaunched',
    plugin: ObservablePersistMMKV,
  },
})

export default function Index() {
  const hasLaunched = use$(hasLaunched$)

  return (
    <>
      <Login hasLaunched={hasLaunched} />
      <View style={styles.container}>
        <SearchBarAnimated />
        <MemoList />
        <MemoCreateButton />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})
