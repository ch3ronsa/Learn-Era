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
        <div className="px-3 py-1.5 rounded-xl bg-[var(--color-smoke)] border-2 border-[var(--color-border)] text-sm font-bold text-[var(--color-chalk)]">
          {shortAddress(address)}
        </div>
        <button
          onClick={disconnect}
          className="px-3 py-1.5 rounded-xl text-sm font-bold text-[var(--color-chalk)]/60 hover:text-[var(--color-petal)] hover:bg-[var(--color-mauve-light)] transition-colors cursor-pointer"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={connect}
      className="btn-chunky btn-chunky-primary px-5 py-2.5 text-sm"
    >
      Connect Wallet
    </button>
  )
}
