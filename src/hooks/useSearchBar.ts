import { searchBarKeyword$ } from '@/state/ui.store'
import { useEffect, useState } from 'react'

export default () => {
  const [text, setText] = useState<string>('')

  useEffect(() => {
    setText(searchBarKeyword$.get())
  }, [searchBarKeyword$.get()])

  const handleSubmit = () => {
    searchBarKeyword$.set(text.trim())
  }

  const handleClearPress = () => {
    setText('')
    searchBarKeyword$.set('')
  }

  return { text, setText, handleSubmit, handleClearPress }
}
