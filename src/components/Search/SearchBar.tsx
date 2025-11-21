import { TextInput, StyleSheet, View, TouchableOpacity, Pressable } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import useSearchBar from '@/hooks/useSearchBar'
import { useTheme } from '@react-navigation/native'

export default () => {
  const { text, setText, handleSubmit, handleClearPress } = useSearchBar()
  const { colors } = useTheme()

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: colors.border,
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        zIndex: 1,
      }}
    >
      <Pressable
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <TextInput
          autoComplete={'off'}
          hitSlop={20}
          style={[styles.SearchBar, { color: colors.text }]}
          placeholder={'Search for a Keyword'}
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSubmit}
        />
        {text && (
          <TouchableOpacity onPress={handleClearPress} hitSlop={10} style={{ marginRight: 1 }}>
            <MaterialIcons name="clear" size={18} color={colors.text} />
          </TouchableOpacity>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  SearchBar: {
    flex: 1,
    textAlign: 'left',
  },
})
