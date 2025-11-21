import { useTheme } from '@react-navigation/native'
import { Stack } from 'expo-router'

export default function SettingsLayout() {
  const { colors } = useTheme()
  return (
    <Stack>
      <Stack.Screen
        name="Overview"
        options={{
          headerLargeTitle: true,
          headerLargeStyle: { backgroundColor: colors.background },
          headerTransparent: true,
          headerBlurEffect: 'regular',
          title: 'Settings',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="About"
        options={{
          title: 'About',
          headerShown: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
      />
    </Stack>
  )
}
