# LearnEra

Decentralized human-expertise marketplace built on [Shelby Protocol](https://shelby.xyz) & [Aptos](https://aptos.dev).

**Learn what AI can't teach you. Real experts. On-chain payments. 95% to creators.**

## What is LearnEra?

LearnEra is a decentralized marketplace for human expertise — the kind of knowledge that AI tools can't replicate. Senior engineers review your actual code. Hiring managers critique your portfolio. Industry veterans mentor you 1-on-1. All payments happen on-chain with a 5% platform fee — creators keep 95%.

Content is stored on Shelby Protocol's decentralized hot storage, making it censorship-resistant and cryptographically verifiable.

## Core Services

- **Real Project Code Review** — Get architecture, security, and performance feedback from senior engineers on your actual codebase
- **Portfolio Feedback** — Actionable reviews from hiring managers and industry professionals who know what stands out
- **Industry-Specific Mentoring** — 1-on-1 guidance for career transitions, insider knowledge, and domain expertise (Web3, Fintech, AI/ML)
- **Hands-On Live Workshops** — Build real projects in real-time with expert instructors

## Features

- **Pay-per-lesson** — Students pay only for what they learn (or access free content)
- **95% creator revenue** — Only 5% platform fee, no middlemen
- **Wallet integration** — Connect via Petra (Aptos) wallet on Shelbynet
- **On-chain verification** — Every lesson verified by merkle proof on Shelby
- **Markdown editor** — Write lessons with live preview and syntax highlighting
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

# Configure (optional — for Shelby uploads)
cp .env.example .env
# Add your API key from https://geomi.dev

# Run dev server
npm run dev

# Build
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## How It Works

1. **Expert** writes a lesson in Markdown, sets category, tags, and price
2. Lesson is uploaded as 2 blobs to Shelby Protocol (metadata JSON + content)
3. **Learner** browses/searches lessons, pays APT to unlock premium content
4. 95% of payment goes to the expert's wallet, 5% platform fee
5. Every lesson has a merkle proof for on-chain verification

## Data Model

Each lesson = 2 Shelby blobs:

- **Metadata blob** (`shelbylearn/meta/{addr}/{slug}`) — JSON with title, description, category, price, author
- **Content blob** (`shelbylearn/content/{addr}/{slug}`) — Markdown lesson content

## Roadmap

| Phase | Timeline | Description |
|-------|----------|-------------|
| **Micro-Learning Marketplace** | Live Now | Pay-per-lesson model, Shelby storage, 95/5 revenue split |
| **Live Sessions & Booking** | Q3 2026 | 1-on-1 code reviews, portfolio sessions, escrow-based payments |
| **Expert Verification & Reputation** | Q4 2026 | On-chain reputation, verified credentials, expertise badges |
| **Workshop Marketplace & Cohorts** | 2027 | Group workshops, cohort-based programs, milestone payments |

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx              # Header, nav, footer
│   ├── WalletConnect.tsx       # Wallet connection button
│   ├── LessonCard.tsx          # Lesson preview card
│   ├── LessonViewer.tsx        # Markdown renderer
│   ├── CategoryFilter.tsx      # Category filter tabs
│   └── ShelbyStatusBanner.tsx  # Shelby connection status
├── pages/
│   ├── Home.tsx                # Landing — 4 core services + roadmap
│   ├── Explore.tsx             # Browse & search lessons
│   ├── CreateLesson.tsx        # Markdown editor + publish
│   ├── ViewLesson.tsx          # Read lesson + paywall + payment
│   ├── Dashboard.tsx           # Educator dashboard
│   └── Profile.tsx             # Educator profile
├── hooks/
│   ├── useShelbyLessons.ts     # Fetch lessons from Shelby + demo data
│   └── useShelbyStatus.ts      # Shelby RPC health check
├── lib/
│   ├── blob-helpers.ts         # Shelby upload/download wrappers
│   ├── payment.ts              # APT payment + 5% fee split
│   ├── profile-storage.ts      # Profile storage on Shelby
│   ├── categories.ts           # Category definitions
│   └── demo-lessons.ts         # Demo lesson data
├── types/
│   └── index.ts                # TypeScript types
├── config.ts                   # Shelby config & client
├── App.tsx                     # Router setup
├── main.tsx                    # Entry point + providers
└── index.css                   # Tailwind + theme
```

## License

MIT
