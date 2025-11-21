import { useTheme } from '@react-navigation/native'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Constants from 'expo-constants'
import SettingsCell from '@/components/Settings/SettingsCell'
import * as WebBrowser from 'expo-web-browser'

import Octicons from '@expo/vector-icons/Octicons'

export default () => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const openLink = async (url: string) => {
    await WebBrowser.openBrowserAsync(url)
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, width: '100%', height: '100%', paddingTop: insets.top, padding: 15 }}
    >
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <SettingsCell
            title={'Report an issue'}
            icon={<Octicons name="issue-opened" size={24} color={colors.text} />}
            onPress={() => openLink('https://github.com/honklam/Dynos/issues')}
          />
        </View>
        <Text style={{ color: colors.text }}>Version {Constants.expoConfig?.version}</Text>
      </View>
    </SafeAreaView>
  )
}
