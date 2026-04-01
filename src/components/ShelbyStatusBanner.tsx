import { useShelbyStatus } from '../hooks/useShelbyStatus'

export function ShelbyStatusBanner() {
  const { shelbyConnected, shelbyChecking } = useShelbyStatus()

  if (shelbyChecking || shelbyConnected) return null

  return (
    <div className="px-4 py-2.5 bg-secondary/5 border-b border-secondary/20 text-center">
      <p className="text-xs text-[var(--color-text-muted)]">
        <strong className="text-secondary">Shelby Testnet:</strong> Unable to reach Shelby network. Showing demo content.
      </p>
    </div>
  )
}
