import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { shortAddress } from '../config'

export function useWalletState() {
  const { connected, account, connect, disconnect } = useWallet()
  const address = account?.address?.toString() || ''

  const connectWallet = () => {
    connect('Petra')
  }

  return { connected, address, connect: connectWallet, disconnect }
}

export function WalletConnect() {
  const { connected, address, connect, disconnect } = useWalletState()

  if (connected && address) {
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
