import { useState, useEffect } from 'react'
import { checkShelbyConnection } from '../config'

let cachedStatus: boolean | null = null

export function useShelbyStatus() {
  const [connected, setConnected] = useState<boolean | null>(cachedStatus)

  useEffect(() => {
    if (cachedStatus !== null) return
    checkShelbyConnection().then(ok => {
      cachedStatus = ok
      setConnected(ok)
    })
  }, [])

  return { shelbyConnected: connected, shelbyChecking: connected === null }
}
