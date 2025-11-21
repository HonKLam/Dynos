import { configureSynced, synced } from '@legendapp/state/sync'
import { syncedCrud } from '@legendapp/state/sync-plugins/crud'
import Storage from 'expo-sqlite/kv-store'
import { observablePersistSqlite } from '@legendapp/state/persist-plugins/expo-sqlite'
import { Memo, Memos, BaseMemo } from '@/types/memo'
import uuid from 'react-native-uuid'
import { updateMemo } from './memo-crud'
import { apiUrl$ } from '@/state/auth.store'
import { observable } from '@legendapp/state'
import type { MemosLocalMeta } from '@/types/memo'
import { secureStoreGet } from './secureStore'
import { isMemo } from './checkMemoType'

const mySyncedCrud = configureSynced(syncedCrud, {
  persist: {
    plugin: observablePersistSqlite(Storage),
    retrySync: true,
  },
  retry: {
    infinite: true,
  },
})

const searchParams = new URLSearchParams({
  pageSize: '1000',
})

async function getApiConfig() {
  const apiUrl = apiUrl$.get()
  const apiBase = `${apiUrl}/api/v1`
  const apiToken = await secureStoreGet('apiAccessToken')

  const headers = new Headers({
    Authorization: `bearer ${apiToken}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  })

  return { apiBase, headers }
}

export const memoListLocal$ = observable<MemosLocalMeta>(
  synced({
    persist: {
      name: 'memosLocal',
      plugin: observablePersistSqlite(Storage),
    },
  }),
)

export const memoList$ = observable<Record<string, BaseMemo | Memo>>(
  mySyncedCrud({
    list: async (params): Promise<BaseMemo[] | Memo[]> => {
      const previousMemoList: (BaseMemo | Memo)[] = Object.values(params.value)

      const unsavedData: BaseMemo[] = previousMemoList.filter((item: BaseMemo | Memo) => {
        const check = isMemo(item)
        if (check === false) return true
        return false
      })

      const { apiBase, headers } = await getApiConfig()

      const res = await fetch(`${apiBase}/memos?${searchParams}`, {
        method: 'GET',
        headers: headers,
      })

      const data: Memos = await res.json()
      console.log('API: GET LIST')

      const memoListLocal = memoListLocal$.peek()

      const remoteData: (BaseMemo | Memo)[] = data.memos.map((memo: Memo) => {
        let id: string
        let localDisplayTime: Date
        let isDirty: boolean

        // Track external Memo Creations
        const memoLocal = memoListLocal?.[memo.name]

        if (memoLocal?.id) {
          id = memoLocal.id
          localDisplayTime = memoLocal.localDisplayTime
          isDirty = memoLocal.isDirty
        } else {
          id = uuid.v4()
          localDisplayTime = new Date(memo.displayTime)
          isDirty = false
          memoListLocal$.assign({ [memo.name]: { id, localDisplayTime, isDirty } })
        }

        return {
          ...memo,
          id: id,
          localDisplayTime: localDisplayTime,
          isDirty: isDirty,
        }
      })

      return remoteData.concat(unsavedData)
    },

    create: async (memo: BaseMemo): Promise<Memo> => {
      const { apiBase, headers } = await getApiConfig()

      const { id, localDisplayTime, isDirty, ...patchedMemo } = memo

      const res = await fetch(`${apiBase}/memos`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(patchedMemo),
      })
      console.log(`API: CREATE MEMO: ${memo.id}`)
      const json = await res.json()

      // Save local field separately
      if (id && localDisplayTime && isDirty) {
        memoListLocal$.assign({ [json.name]: { id, localDisplayTime, isDirty } })
      }

      return {
        ...json,
        id: id,
        localDisplayTime: localDisplayTime,
        isDirty: isDirty,
      }
    },

    update: async (memo: Memo): Promise<Memo> => {
      const { apiBase, headers } = await getApiConfig()

      // Remove Local Variables
      const { id, localDisplayTime, isDirty, ...serverMemo } = memo

      // Adjust Variables send to Remote (based on local variables)
      const patchedMemo = {
        ...serverMemo,
        displayTime: localDisplayTime,
      }
      const res = await fetch(`${apiBase}/${memo.name}`, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(patchedMemo),
      })
      console.log(`API: UPDATE MEMO: ${memo.id} (${memo.name}) [${patchedMemo.displayTime}]`)
      const json = await res.json()

      return {
        ...json,
        id: id,
        localDisplayTime: localDisplayTime,
        isDirty: false,
      }
    },

    delete: async (memo: Memo): Promise<void> => {
      const { apiBase, headers } = await getApiConfig()

      await fetch(`${apiBase}/${memo.name}`, {
        method: 'DELETE',
        headers: headers,
      })
      console.log(`API: DELETE MEMO: ${memo.id}`)
      memoListLocal$.assign({ [memo.name]: undefined })
    },

    onSaved: ({ input, isCreate }: { input: BaseMemo; isCreate: boolean }) => {
      if (isCreate) {
        updateMemo(input)
        return
      }
    },

    persist: {
      name: 'memos',
    },
  }),
)
