import { TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { use$ } from '@legendapp/state/react'
import { searchBarIsVisible$, searchBarKeyword$ } from '@/state/ui.store'
import { useTheme } from '@react-navigation/native'

export default () => {
  const handlePress = () => {
    searchBarIsVisible$.set(!searchBarIsVisible$.get())
  }

  const searchBarKeyword = use$(searchBarKeyword$)
  const { colors } = useTheme()

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        hitSlop={10}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 15,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {searchBarKeyword ? (
            <Ionicons name="search-circle" size={28} color={colors.primary} />
          ) : (
            <Ionicons name="search-circle-outline" size={28} color={colors.text} />
          )}
        </View>
      </TouchableOpacity>
    </>
  )
}
