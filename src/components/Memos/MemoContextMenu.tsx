import Entypo from '@expo/vector-icons/Entypo'
import { TouchableOpacity } from 'react-native'
import ContextMenu from 'react-native-context-menu-view'
import MemoModal from '@/components/Memos/MemoModal'
import { BaseMemo, Memo } from '@/types/memo'
import useMemoContextMenu from '@/hooks/useMemoContextMenu'
import { useTheme } from '@react-navigation/native'

export default ({ memo }: { memo: BaseMemo | Memo }) => {
  const { isVisible, handleSubmit, handleCancel, text, updateText, handleMenuPress } = useMemoContextMenu(memo)
  const { colors } = useTheme()

  return (
    <ContextMenu
      title={'More Actions'}
      dropdownMenuMode={true}
      actions={[
        { title: 'Edit', systemIcon: 'pencil' },
        { title: 'Delete', systemIcon: 'trash', iconColor: 'red', destructive: true },
      ]}
      onPress={(e) => handleMenuPress(e)}
    >
      <TouchableOpacity style={{ paddingTop: 0, paddingLeft: 40, padding: 10 }}>
        <Entypo name="dots-three-horizontal" size={14} color={colors.text} />
      </TouchableOpacity>
      <MemoModal
        isVisible={isVisible}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        text={text}
        setText={updateText}
      />
    </ContextMenu>
  )
}
