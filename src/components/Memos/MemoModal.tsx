import {
  Keyboard,
  Modal,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native'
import DatePickerModal from '@/components/Calendar/DatePickerModal'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from '@react-navigation/native'

type props = {
  isVisible: boolean
  handleCancel: () => void
  handleSubmit: () => void
  text: string
  setText: (text: string) => void
}

export default ({ isVisible, handleCancel, handleSubmit, text, setText }: props) => {
  const { colors } = useTheme()

  return (
    <Modal animationType="slide" visible={isVisible} presentationStyle="pageSheet" backdropColor={colors.background}>
      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ margin: 20, marginTop: 0, height: '100%', paddingBottom: '100%' }}>
            <View style={styles.topBar}>
              <Pressable onPress={handleCancel} hitSlop={10}>
                {({ pressed }) => {
                  return (
                    <AntDesign name={pressed ? 'closecircle' : 'closecircleo'} size={24} color={colors.notification} />
                  )
                }}
              </Pressable>

              <DatePickerModal />

              <Pressable onPress={handleSubmit} hitSlop={10}>
                {({ pressed }) => {
                  return <AntDesign name={pressed ? 'checkcircle' : 'checkcircleo'} size={24} color={colors.text} />
                }}
              </Pressable>
            </View>

            <View style={styles.textContainer}>
              <Text style={{ color: colors.text }}>Note</Text>
              <TextInput
                scrollEnabled={false}
                autoComplete={'off'}
                multiline={true}
                placeholder={'Write down your thoughts...'}
                onChangeText={(text: string) => setText(text)}
                value={text}
                onSubmitEditing={Keyboard.dismiss}
                submitBehavior={'newline'}
                style={[styles.textInput, { backgroundColor: colors.card, color: colors.text }]}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
  },
  topBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#ededed',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    textAlign: 'left',
    textAlignVertical: 'top',
    fontSize: 14,
  },
})
