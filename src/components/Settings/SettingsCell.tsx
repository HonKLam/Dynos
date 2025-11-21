import { useTheme } from '@react-navigation/native'
import { TouchableOpacity, View, Text } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'

export default ({ title, onPress, icon }: { title: string; onPress: () => void; icon: React.ReactNode }) => {
  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.card,
        height: 45,
        padding: 5,
        borderRadius: 10,
        width: '100%',
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <View style={{ paddingRight: 10 }}>{icon}</View>
          <Text style={{ fontSize: 16, color: colors.text }}>{title}</Text>
        </View>
        <AntDesign name="right" size={20} color={colors.text} />
      </View>
    </TouchableOpacity>
  )
}
