import { Memo } from '@/types/memo'

export async function checkConnection(url: URL, apiToken: string): Promise<boolean> {
  try {
    const headers = new Headers({
      Authorization: `bearer ${apiToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })

    const res = await fetch(`${url.origin}/api/v1/memos`, {
      headers: headers,
      method: 'POST',
    })

    // Check Connection + PAT by POSTING and afterwards DELETING a memo
    if (res.status !== 200) {
      return false
    }

    const returnedMemo: Memo = await res.json()
    const secondRes = await fetch(`${url.origin}/api/v1/${returnedMemo.name}`, {
      headers: headers,
      method: 'DELETE',
    })

    if (secondRes.status !== 200) {
      return false
    }

    return true
  } catch (err) {
    return false
  }
}

export function isValidUrl(text: string): boolean {
  try {
    new URL(text)
    return true
  } catch (err) {
    return false
  }
}
