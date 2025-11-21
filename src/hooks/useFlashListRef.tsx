import React, { createContext, useContext, useRef } from 'react'
import type { FlashListRef } from '@shopify/flash-list'
import type { BaseMemo, Memo } from '@/types/memo'

type RefType = FlashListRef<BaseMemo | Memo | string> | null

const FlashListRefContext = createContext<React.RefObject<RefType> | null>(null)

export function FlashListRefProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<RefType>(null)
  return <FlashListRefContext.Provider value={ref}>{children}</FlashListRefContext.Provider>
}

export function useFlashListRef() {
  const ctx = useContext(FlashListRefContext)
  if (!ctx) throw new Error('useFlashListRef must be used inside FlashListRefProvider')
  return ctx
}
