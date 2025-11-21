import { Stack } from 'expo-router'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { FlashListRefProvider } from '@/hooks/useFlashListRef'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <ActionSheetProvider>
          <FlashListRefProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </FlashListRefProvider>
        </ActionSheetProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
