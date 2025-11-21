import { Alert, NativeSyntheticEvent } from 'react-native'
import useMemoModal from './useMemoModal'
import { ContextMenuOnPressNativeEvent } from 'react-native-context-menu-view'
import { BaseMemo, Memo } from '@/types/memo'
import { deleteMemo } from '@/lib/memo-crud'

export default (memo: BaseMemo | Memo) => {
  const { isVisible, onModalOpen, handleSubmit, handleCancel, text, updateText } = useMemoModal()

  const handleMenuPress = (e: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>) => {
    const { index } = e.nativeEvent
    // 0: Edit, 1: Delete
    switch (index) {
      case 0:
        onModalOpen(memo.content, memo.localDisplayTime, memo)
        break

      case 1:
        deleteAlert(memo.id)
        break

      default:
        break
    }
  }

  const deleteAlert = (id: string) => {
    Alert.alert('Delete Memo?', 'This will apply on all platforms.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteMemo(id),
        style: 'destructive',
      },
    ])
  }

  return {
    isVisible,
    onModalOpen,
    handleSubmit,
    handleCancel,
    text,
    updateText,
    handleMenuPress,
  }
}
