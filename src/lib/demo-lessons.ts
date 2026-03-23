import type { Lesson, Category } from '../types'

// Demo lessons for showcasing the platform before real Shelby integration
const demoLessons: Lesson[] = [
  {
    version: 1,
    title: 'React Hooks in 5 Minutes',
    description: 'Learn useState, useEffect, and useCallback with practical examples.',
    author: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    category: 'code' as Category,
    tags: ['react', 'hooks', 'javascript', 'frontend'],
    contentBlobName: 'demo/content/react-hooks',
    metaBlobName: 'demo/meta/react-hooks',
    price: 0,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    language: 'en',
    content: `# React Hooks in 5 Minutes

Hooks let you use state and other React features in function components.

## useState

\`\`\`tsx
const [count, setCount] = useState(0)

return <button onClick={() => setCount(c => c + 1)}>
  Clicked {count} times
</button>
\`\`\`

## useEffect

Run side effects after render:

\`\`\`tsx
useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count]) // re-run when count changes
\`\`\`

## useCallback

Memoize functions to avoid unnecessary re-renders:

\`\`\`tsx
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])
\`\`\`

## Key Rules
- Only call hooks at the **top level**
- Only call hooks from **React functions**
- Custom hooks start with **use**

That's it! You now know the 3 most important hooks.`,
  },
  {
    version: 1,
    title: 'CSS Grid Layout Crash Course',
    description: 'Master CSS Grid with real-world layout patterns you can use today.',
    author: '0xabcdef1234567890abcdef1234567890abcdef34',
    category: 'design' as Category,
    tags: ['css', 'grid', 'layout', 'responsive'],
    contentBlobName: 'demo/content/css-grid',
    metaBlobName: 'demo/meta/css-grid',
    price: 0.05,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    language: 'en',
    content: `# CSS Grid Layout Crash Course

CSS Grid is the most powerful layout system in CSS.

## Basic Grid

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
\`\`\`

## Responsive Grid (No Media Queries!)

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

## Named Areas

\`\`\`css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
\`\`\`

## Pro Tip
Combine Grid with Flexbox: use Grid for page layout, Flexbox for component internals.`,
  },
  {
    version: 1,
    title: 'TypeScript Generics Explained',
    description: 'Understand generics with simple, practical examples. No PhD required.',
    author: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    category: 'code' as Category,
    tags: ['typescript', 'generics', 'types'],
    contentBlobName: 'demo/content/ts-generics',
    metaBlobName: 'demo/meta/ts-generics',
    price: 0,
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    language: 'en',
    content: `# TypeScript Generics Explained

Generics let you write reusable, type-safe code.

## The Problem

\`\`\`typescript
function first(arr: any[]): any {
  return arr[0] // We lose type information!
}
\`\`\`

## The Solution: Generics

\`\`\`typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0] // Type is preserved!
}

const num = first([1, 2, 3])     // number
const str = first(['a', 'b'])     // string
\`\`\`

## Generic Interfaces

\`\`\`typescript
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

type UserResponse = ApiResponse<{ name: string; email: string }>
\`\`\`

## Constraints

\`\`\`typescript
function getLength<T extends { length: number }>(item: T): number {
  return item.length
}

getLength("hello")    // OK
getLength([1, 2, 3])  // OK
getLength(42)          // Error!
\`\`\`

Think of generics as **type variables** — placeholders that get filled in when you use the function.`,
  },
  {
    version: 1,
    title: 'Music Theory: Chord Progressions',
    description: 'The 4 chord progressions that power 90% of pop music.',
    author: '0x9876543210fedcba9876543210fedcba98765432',
    category: 'music' as Category,
    tags: ['music', 'chords', 'theory', 'songwriting'],
    contentBlobName: 'demo/content/chord-progressions',
    metaBlobName: 'demo/meta/chord-progressions',
    price: 0.1,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
    language: 'en',
    content: `# Chord Progressions That Power Pop Music

You only need 4 progressions to write most songs.

## 1. The "Pop Punk" - I V vi IV
**C - G - Am - F** (in C major)

Used in: Let It Be, No Woman No Cry, With or Without You

## 2. The "Sad" - vi IV I V
**Am - F - C - G** (in C major)

Used in: Africa, Numb, Save Tonight

## 3. The "Classic" - I IV V IV
**C - F - G - F** (in C major)

Used in: Twist and Shout, La Bamba, Louie Louie

## 4. The "Emotional" - I V vi iii IV I IV V
**C - G - Am - Em - F - C - F - G** (Canon in D progression)

Used in: thousands of classical and pop pieces

## Quick Tips
- **Major chords** = happy, bright
- **Minor chords** = sad, moody
- **Start with I** for stability
- **End with V** for tension (wants to resolve)

Play these 4 progressions and you can jam with anyone!`,
  },
  {
    version: 1,
    title: 'Business Model Canvas in 5 Minutes',
    description: 'Map your entire business model on one page. Used by startups worldwide.',
    author: '0xfedcba9876543210fedcba9876543210fedcba98',
    category: 'business' as Category,
    tags: ['business', 'startup', 'strategy', 'canvas'],
    contentBlobName: 'demo/content/bmc',
    metaBlobName: 'demo/meta/bmc',
    price: 0,
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    language: 'en',
    content: `# Business Model Canvas in 5 Minutes

The BMC maps your entire business on one page.

## The 9 Blocks

| # | Block | Question |
|---|-------|----------|
| 1 | **Customer Segments** | Who are your customers? |
| 2 | **Value Propositions** | What problem do you solve? |
| 3 | **Channels** | How do you reach customers? |
| 4 | **Customer Relationships** | How do you interact? |
| 5 | **Revenue Streams** | How do you make money? |
| 6 | **Key Resources** | What do you need? |
| 7 | **Key Activities** | What do you do? |
| 8 | **Key Partnerships** | Who helps you? |
| 9 | **Cost Structure** | What does it cost? |

## Example: ShelbyLearn

- **Segments:** Educators, Students
- **Value Prop:** Micro-lessons, no middleman, 100% creator revenue
- **Channels:** Web app, social media, crypto communities
- **Revenue:** Micro-payments per lesson (APT)
- **Key Resource:** Shelby Protocol (decentralized storage)

Start with blocks 1 and 2. Everything else follows.`,
  },
  {
    version: 1,
    title: 'Spanish Basics: 50 Essential Phrases',
    description: 'Survive your first week in a Spanish-speaking country with these phrases.',
    author: '0xabcdef1234567890abcdef1234567890abcdef34',
    category: 'language' as Category,
    tags: ['spanish', 'beginner', 'phrases', 'travel'],
    contentBlobName: 'demo/content/spanish-basics',
    metaBlobName: 'demo/meta/spanish-basics',
    price: 0.05,
    createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
    language: 'en',
    content: `# Spanish Basics: 50 Essential Phrases

## Greetings
- **Hola** - Hello
- **Buenos dias** - Good morning
- **Buenas tardes** - Good afternoon
- **Buenas noches** - Good evening
- **Adios** - Goodbye
- **Hasta luego** - See you later

## Essentials
- **Por favor** - Please
- **Gracias** - Thank you
- **De nada** - You're welcome
- **Lo siento** - I'm sorry
- **Disculpe** - Excuse me

## Getting Around
- **Donde esta...?** - Where is...?
- **Cuanto cuesta?** - How much does it cost?
- **La cuenta, por favor** - The check, please
- **No entiendo** - I don't understand
- **Habla ingles?** - Do you speak English?

## Food & Drink
- **Agua** - Water
- **Cerveza** - Beer
- **Cafe** - Coffee
- **La carta** - The menu
- **Delicioso!** - Delicious!

## Pro Tip
Learn the question words first: **Que** (what), **Donde** (where), **Cuando** (when), **Por que** (why), **Como** (how), **Cuanto** (how much).

With these + pointing, you can survive anywhere!`,
  },
]

export function getDemoLessons(): Lesson[] {
  return demoLessons
}

export function getDemoLesson(slug: string): Lesson | undefined {
  return demoLessons.find(l => l.contentBlobName.endsWith(slug) || l.metaBlobName.endsWith(slug))
}

export function getDemoLessonsByCategory(category: Category): Lesson[] {
  return demoLessons.filter(l => l.category === category)
}

export function searchDemoLessons(query: string): Lesson[] {
  const q = query.toLowerCase()
  return demoLessons.filter(l =>
    l.title.toLowerCase().includes(q) ||
    l.description.toLowerCase().includes(q) ||
    l.tags.some(t => t.includes(q))
  )
}
