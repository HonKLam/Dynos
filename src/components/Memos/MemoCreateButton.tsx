import { TouchableOpacity, View, StyleSheet } from 'react-native'
import MemoModal from '@/components/Memos/MemoModal'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import useMemoModal from '@/hooks/useMemoModal'
import { useTheme } from '@react-navigation/native'

export default () => {
  const { isVisible, onModalOpen, handleSubmit, handleCancel, text, updateText } = useMemoModal()
  const { colors } = useTheme()

  return (
    <>
      <TouchableOpacity
        onPress={() => onModalOpen('', new Date())}
        hitSlop={10}
        style={[styles.container, { backgroundColor: colors.primary }]}
      >
        <View style={styles.inner}>
          <FontAwesome6 name="add" size={24} color={colors.text} />
        </View>
      </TouchableOpacity>
      <MemoModal
        isVisible={isVisible}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        text={text}
        setText={updateText}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
    position: 'absolute',
    bottom: 0,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
