import SettingsCell from '@/components/Settings/SettingsCell'
import { hasLaunched$ } from '@/state/app.store'
import { apiUrl$ } from '@/state/auth.store'
import { useRouter } from 'expo-router'
import { Alert, Platform, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { useTheme } from '@react-navigation/native'
import { secureStoreDelete, secureStoreGet } from '@/lib/secureStore'
import { checkConnection } from '@/lib/checkConnection'

export default () => {
  const router = useRouter()
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const resetAlert = () => {
    Alert.alert('Reset Server Credentials?', 'You will return to the Login Page.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Reset',
        onPress: () => resetLoginCredentials(),
        style: 'destructive',
      },
    ])
  }

  const checkConnectionAlert = async () => {
    const isConnected = await checkAsyncConnection()
    if (isConnected) {
      Alert.alert('Connection and Authentication successful', 'Memos are synced with your Memos Server!')
    } else {
      Alert.alert(
        'Connection or Authentication failed',
        'Make sure your Memos Server URL is reachable and your Personal Access Token has not expired yet! Reset your Server Credentials to input a new URL or Access Token!',
      )
    }
  }

  const checkAsyncConnection = async () => {
    const apiUrl = apiUrl$.get()
    const apiAccessToken = await secureStoreGet('apiAccessToken')

    return await checkConnection(new URL(apiUrl), apiAccessToken ?? '')
  }

  const resetLoginCredentials = async () => {
    apiUrl$.set('')
    await secureStoreDelete('apiAccessToken')

    hasLaunched$.set(false)
    router.push('/(tabs)')
  }

  return (
    <View style={{ paddingTop: insets.top + (Platform.OS === 'ios' ? 50 : 0) }}>
      <View
        style={{
          backgroundColor: colors.background,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          padding: 15,
          marginTop: 40,
        }}
      >
        <SettingsCell
          title="About"
          onPress={() => router.push('/Settings/About')}
          icon={<MaterialCommunityIcons name="information" size={24} color={colors.text} />}
        />
        <SettingsCell
          title="Check Connection"
          onPress={checkConnectionAlert}
          icon={<MaterialCommunityIcons name="connection" size={24} color={colors.primary} />}
        />
        <SettingsCell
          title="Reset Server Credentials"
          onPress={resetAlert}
          icon={<MaterialCommunityIcons name="lock-reset" size={24} color={colors.notification} />}
        />
      </View>
    </View>
  )
}
