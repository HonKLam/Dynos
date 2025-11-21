import * as SecureStore from 'expo-secure-store'

export const secureStoreSave = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value)
}

export const secureStoreDelete = async (key: string) => {
  await SecureStore.deleteItemAsync(key)
}

export const secureStoreGet = async (key: string) => {
  return await SecureStore.getItemAsync(key)
}
