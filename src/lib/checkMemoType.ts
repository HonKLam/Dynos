import { BaseMemo, Memo } from '@/types/memo'

export const isMemo = (m: BaseMemo | Memo): m is Memo => {
  return (m as Memo).name !== undefined
}
