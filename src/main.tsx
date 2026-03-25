import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ShelbyClientProvider } from '@shelby-protocol/react'
import { SHELBY_NETWORK, getShelbyClient } from './config'
import './index.css'
import App from './App'

const queryClient = new QueryClient()
const shelbyClient = getShelbyClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AptosWalletAdapterProvider
        autoConnect={true}
        dappConfig={{ network: SHELBY_NETWORK }}
        onError={(error) => console.error('Wallet error:', error)}
      >
        <ShelbyClientProvider client={shelbyClient}>
          <App />
        </ShelbyClientProvider>
      </AptosWalletAdapterProvider>
    </QueryClientProvider>
  </StrictMode>,
)
