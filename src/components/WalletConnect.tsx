import { useState } from 'react'
import { shortAddress } from '../config'

// Simulated wallet state for demo (replace with real Aptos Wallet Adapter)
let _connected = false
let _address = ''

export function useWalletState() {
  const [connected, setConnected] = useState(_connected)
  const [address, setAddress] = useState(_address)

  const connect = () => {
    // Demo: simulate wallet connection
    _connected = true
    _address = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    setConnected(true)
    setAddress(_address)
  }

  const disconnect = () => {
    _connected = false
    _address = ''
    setConnected(false)
    setAddress('')
  }

  return { connected, address, connect, disconnect }
}

export function WalletConnect() {
  const { connected, address, connect, disconnect } = useWalletState()

  if (connected) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border)] text-sm text-[var(--color-text-muted)]">
          {shortAddress(address)}
        </div>
        <button
          onClick={disconnect}
          className="px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-muted)] hover:text-red-400 hover:bg-[var(--color-surface-light)] transition-colors cursor-pointer"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      className="px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-sm font-medium transition-colors cursor-pointer"
    >
      Connect Wallet
    </button>
  )
}
