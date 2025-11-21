import { Animated, Easing } from 'react-native'
import { useEffect, useRef } from 'react'
import { use$ } from '@legendapp/state/react'
import SearchBar from '@/components/Search/SearchBar'
import { searchBarIsVisible$ } from '@/state/ui.store'

export default function AnimatedSearchBar() {
  const searchBarIsVisible = use$(searchBarIsVisible$)
  const slideAnim = useRef(new Animated.Value(-100)).current

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: searchBarIsVisible ? 0 : -100, // slide in/out
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [searchBarIsVisible])

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        height: '5%',
        zIndex: 0,
        position: 'absolute',
        width: '100%',
        top: 0,
      }}
    >
      <SearchBar />
    </Animated.View>
  )
}
