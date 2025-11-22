import { useState } from 'react'
import { Text, Button, Modal, View, TextInput, StyleSheet } from 'react-native'
import { syncObservable } from '@legendapp/state/sync'
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv'
import { checkConnection, isValidUrl } from '@/lib/checkConnection'
import { apiUrl$ } from '@/state/auth.store'
import { hasLaunched$ } from '@/state/app.store'
import { useTheme } from '@react-navigation/native'
import { secureStoreSave } from '@/lib/secureStore'
import { createNewMemo, refreshMemoList } from '@/lib/memo-crud'
import { memoList$ } from '@/lib/api'

syncObservable(apiUrl$, {
  persist: {
    name: 'apiUrl',
    plugin: ObservablePersistMMKV,
    retrySync: true,
  },
  retry: {
    infinite: true,
  },
})

export default function Login({ hasLaunched }: { hasLaunched: boolean }) {
  const [apiUrlText, setApiUrlText] = useState<string>('')
  const [apiAccessTokenText, setApiAccessTokenText] = useState<string>('')
  const { colors } = useTheme()

  const handleConnect = async () => {
    if (isValidUrl(apiUrlText) == false) {
      alert('URL invalid. Please try again!')
      return
    }

    const isConnected = await checkConnection(new URL(apiUrlText), apiAccessTokenText)

    if (isConnected) {
      apiUrl$.set(new URL(apiUrlText).origin)
      await secureStoreSave('apiAccessToken', apiAccessTokenText)

      alert('Connection Successful')

      setApiUrlText('')
      setApiAccessTokenText('')
      hasLaunched$.set(true)

      // HACK: Create Memo when connecting for Legend State to properly sync when logging in for the first time
      createNewMemo('Welcome to Dynos! Feel free to delete this note! :)', new Date())
      refreshMemoList()
    } else {
      alert('Connection Failed. Please try again!')
    }
  }

  return (
    <Modal visible={!hasLaunched} presentationStyle="fullScreen" animationType="slide">
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>Please put in URL + Access Token</Text>
        <TextInput
          autoComplete={'off'}
          value={apiUrlText}
          onChangeText={setApiUrlText}
          style={[styles.textInput, { color: colors.text }]}
          placeholder={'http://192.168.2.122:5230'}
          autoCapitalize="none"
        />
        <TextInput
          autoComplete={'off'}
          value={apiAccessTokenText}
          onChangeText={setApiAccessTokenText}
          style={[styles.textInput, { color: colors.text }]}
          placeholder={'Access Token'}
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Button title="Connect" onPress={handleConnect} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderColor: 'grey',
    width: '50%',
    margin: 10,
  },
})
