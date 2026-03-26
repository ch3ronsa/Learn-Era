import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { shortAddress } from '../config'

export function useWalletState() {
  const { connected, account, connect, disconnect } = useWallet()
  const address = account?.address?.toString() || ''
  const connectWallet = () => { connect('Petra') }
  return { connected, address, connect: connectWallet, disconnect }
}

export function WalletConnect() {
  const { connected, address, connect, disconnect } = useWalletState()

  if (connected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="px-3 py-1.5 rounded-full bg-[var(--color-smoke-light)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-chalk)]">
          {shortAddress(address)}
        </span>
        <button onClick={disconnect} className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-petal)] transition-colors cursor-pointer">
          Logout
        </button>
      </div>
    )
  }

  return (
    <button onClick={connect} className="btn-pill btn-pill-primary btn-pill-sm">
      Connect Wallet
    </button>
  )
}
