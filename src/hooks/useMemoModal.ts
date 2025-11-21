import { setDisplayTime$ } from '@/components/Calendar/DatePickerModal'
import { createNewMemo, updateMemo } from '@/lib/memo-crud'
import { BaseMemo, Memo } from '@/types/memo'
import { useState } from 'react'

export default function useMemoModal() {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [text, setText] = useState<string>('')
  const [editingMemo, setEditingMemo] = useState<BaseMemo | Memo | null>(null)

  const onModalClose = () => {
    setEditingMemo(null)
    setIsVisible(false)
  }

  const onModalOpen = (displayedText: string, date: Date, memo?: BaseMemo | Memo) => {
    if (memo) {
      setEditingMemo(memo)
    }

    setText(displayedText)
    setDisplayTime$.set(date)
    setIsVisible(true)
  }

  const handleCancel = () => {
    onModalClose()
  }

  const handleSubmit = () => {
    if (editingMemo) {
      const patchedMemo = {
        ...editingMemo,
        content: text,
        localDisplayTime: setDisplayTime$.get(),
        isDirty: true,
      }
      updateMemo(patchedMemo)
    } else {
      createNewMemo(text, setDisplayTime$.get())
    }
    onModalClose()
  }

  const updateText = (newText: string) => {
    setText(newText)
  }

  return { isVisible, onModalOpen, handleCancel, handleSubmit, text, updateText }
}
