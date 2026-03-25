// Buffer polyfill — must be before any Shelby SDK import
import { Buffer } from 'buffer'
;(window as any).Buffer = Buffer

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ShelbyClientProvider } from '@shelby-protocol/react'
import { getShelbyClient } from './config'
import './index.css'
import App from './App'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AptosWalletAdapterProvider autoConnect={false}>
        <ShelbyClientProvider client={getShelbyClient()}>
          <App />
        </ShelbyClientProvider>
      </AptosWalletAdapterProvider>
    </QueryClientProvider>
  </StrictMode>,
)
