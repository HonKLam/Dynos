import { BaseMemo, MemoState, MemoVisibility } from '@/types/memo'

import uuid from 'react-native-uuid'
import { syncState } from '@legendapp/state'
import { memoList$ } from './api'

export function createNewMemo(content: string, localDisplayTime: Date) {
  const id = uuid.v4()

  memoList$.assign({
    [id]: {
      id: id,
      content: content,
      state: MemoState.NORMAL,
      visibility: MemoVisibility.PRIVATE,
      localDisplayTime: localDisplayTime,
      isDirty: false,
    },
  })
}

export function updateMemo(patchedMemo: BaseMemo) {
  const node = memoList$[patchedMemo.id]
  node.assign({
    content: patchedMemo.content,
    displayTime: patchedMemo.localDisplayTime.toString(),
    localDisplayTime: patchedMemo.localDisplayTime,
    isDirty: patchedMemo.isDirty,
  })
}

export function deleteAllMemos() {
  for (const [key] of Object.entries(memoList$)) {
    memoList$[key].delete()
  }
}

export function deleteMemo(id: string) {
  if (!memoList$[id].get()) {
    console.log('ERROR: NO MEMO FOUND WITH THIS ID')
  }

  memoList$[id].delete()
}

export function refreshMemoList() {
  syncState(memoList$).sync()
}
