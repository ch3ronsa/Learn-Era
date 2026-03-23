# ShelbyLearn

Decentralized micro-learning platform built on [Shelby Protocol](https://shelby.xyz) & [Aptos](https://aptos.dev).

**Learn anything. Pay per lesson. No middleman.**

## What is ShelbyLearn?

ShelbyLearn is a decentralized micro-learning marketplace where educators publish bite-sized lessons and students pay per lesson using APT. No platform fees — educators keep 100% of their revenue.

Lessons are stored as verified blobs on Shelby Protocol's decentralized hot storage, making them censorship-resistant and cryptographically verifiable via merkle proofs.

## Features

- **Micro-lessons** — Short, focused lessons in Markdown with syntax highlighting
- **Pay-per-lesson** — Students pay only for what they learn (or access free content)
- **100% creator revenue** — No middleman, no platform commission
- **6 categories** — Code, Design, Music, Language, Business, Other
- **Markdown editor** — Write lessons with live preview and code highlighting
- **Wallet integration** — Connect via Petra (Aptos) wallet
- **On-chain verification** — Every lesson verified by merkle proof on Shelby
- **Search & filter** — Browse by category, search by title/tags

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4
- **Blockchain:** Aptos (Shelbynet)
- **Storage:** Shelby Protocol SDK (`@shelby-protocol/sdk`, `@shelby-protocol/react`)
- **Wallet:** Aptos Wallet Adapter (Petra)
- **Markdown:** react-markdown + rehype-highlight + remark-gfm
- **Routing:** React Router v7

## Getting Started

```bash
# Clone
git clone https://github.com/ch3ronsa/Learn-Era.git
cd Learn-Era

# Install
npm install

# Run dev server
npm run dev

# Build
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx           # Header, nav, footer
│   ├── WalletConnect.tsx    # Wallet connection button
│   ├── LessonCard.tsx       # Lesson preview card
│   ├── LessonViewer.tsx     # Markdown renderer
│   └── CategoryFilter.tsx   # Category filter tabs
├── pages/
│   ├── Home.tsx             # Landing page + featured lessons
│   ├── Explore.tsx          # Browse & search lessons
│   ├── CreateLesson.tsx     # Markdown editor + publish
│   ├── ViewLesson.tsx       # Read lesson + paywall
│   ├── Dashboard.tsx        # Educator dashboard
│   └── Profile.tsx          # Educator profile
├── lib/
│   ├── blob-helpers.ts      # Shelby upload/download wrappers
│   ├── categories.ts        # Category definitions
│   └── demo-lessons.ts      # Demo lesson data
├── types/
│   └── index.ts             # TypeScript types
├── config.ts                # Shelby config & utilities
├── App.tsx                  # Router setup
├── main.tsx                 # Entry point
└── index.css                # Tailwind + prose styles
```

## How It Works

1. **Educator** writes a lesson in Markdown, sets category, tags, and price
2. Lesson is uploaded as 2 blobs to Shelby Protocol (metadata JSON + content)
3. **Student** browses/searches lessons, pays APT to unlock premium content
4. Payment goes directly to educator's wallet — no intermediary
5. Every lesson has a merkle proof for on-chain verification

## Data Model

Each lesson = 2 Shelby blobs:

- **Metadata blob** (`shelbylearn/meta/{addr}/{slug}`) — JSON with title, description, category, price, author
- **Content blob** (`shelbylearn/content/{addr}/{slug}`) — Markdown lesson content

## Current Status

> **Work in progress** — UI and demo mode functional. Shelby testnet integration next.

### Done
- [x] Project setup (React + Vite + Tailwind + Shelby SDK)
- [x] All 6 pages (Home, Explore, Create, View, Dashboard, Profile)
- [x] All components (Layout, LessonCard, CategoryFilter, LessonViewer, WalletConnect)
- [x] Demo lessons (6 sample lessons across categories)
- [x] Markdown editor with live preview
- [x] Category filtering and search
- [x] Paywall UI for premium lessons
- [x] Build passing

### TODO
- [ ] Preview & fix UI issues
- [ ] Connect real Shelby SDK upload/download (replace demo data)
- [ ] Real Petra wallet integration (replace simulated wallet)
- [ ] Lesson discovery via registry blob or on-chain index
- [ ] APT payment flow for premium lessons
- [ ] Deploy to Vercel

## License

MIT
