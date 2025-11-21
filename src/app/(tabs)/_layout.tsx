import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

import HomeHeader from '@/components/HomeHeader'

import { i18n } from '@/lib/i18n'
import { useTheme } from '@react-navigation/native'

export default function TabLayout() {
  const { colors } = useTheme()
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.primary }}>
      <Tabs.Screen
        name="index"
        options={{
          title: i18n.t('tabbar.home'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          header: () => <HomeHeader />,
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: i18n.t('tabbar.calendar'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: i18n.t('tabbar.settings'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          headerShown: false,
        }}
      />
    </Tabs>
  )
}
