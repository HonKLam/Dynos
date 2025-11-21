import { useTheme } from '@react-navigation/native'
import { Text } from 'react-native'

export default ({ title }: { title: string }) => {
  const { colors } = useTheme()
  return (
    <Text
      style={{
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 15,
        marginBottom: 15,
        marginTop: 15,
        textAlign: 'left',
        color: colors.text,
      }}
    >
      {title}
    </Text>
  )
}
