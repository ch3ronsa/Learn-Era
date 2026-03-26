import { Link } from 'react-router-dom'
import type { Lesson } from '../types'

interface LessonCardProps {
  lesson: Lesson
}

export function LessonCard({ lesson }: LessonCardProps) {
  // We use placeholder images based on Category or just a hardcoded one for the new theme
  const getPlaceholderImage = (cat: string) => {
    if(cat === 'code') return "https://lh3.googleusercontent.com/aida-public/AB6AXuBEDekkyQzwSq4F8uW5qLBVfNPTNyGdDT772UdNq9pkbSqPSxWiQsnvugOjfWdUSIxcGhpaG4oGRnLAoA5N1FC4oQoioLPxYCaqQupfREZ1TVPVh_PXdL0q-uFMzwycmeIM32cpOrdm2Jb3-pBmZJRn_S7KWXLz0fASqQ-HploG3aWJaDdn3bSdLu4HiyBW1DihuecMUKyvkv5up0ASMXx2JK61oaymQsWMO4u1RE0HqKInSWBKQ8xwYb8t1Yeojch_Y2jo4SppYgiS";
    if(cat === 'design') return "https://lh3.googleusercontent.com/aida-public/AB6AXuDQjZStYE2tGT2Y7MJCpHur707u7LOR4gRe1aPVbq3pNQ0vaIiu2J0mzDkjXNineUfWLN32E4_3rVWpugK7JrDgZIaApQg5T5edL0Ga_RwJSVtG45v_T4hWDi3hsBwIao-NBL5KyGCIJUPOkg3zVBrFkrdSo50O4k9yjzFT9atIQ5P_bK48W7S0G7tyMkAzXlzdmirqFxa9NoOTbhsenkn3T6RsCFQjNNfmg--SiyJ7MVOEfMYhsX5t43mFl2qEzQTSe1RcQ-n0XGyK";
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuDlTi46CiUcR1yp2_PUhPRpJWdd9o4V0E7pYqLEh4-EspS__nJpa9H6M07cqYnTdYgby6QftzGAkBZkdO1lbHo7v5t7ACCzmmG89lUZAYVL9leQ7JUvPYcRTR7kWAUZAebgJ9fuY4AAvTCwvLXRIsaLBqZh2yNQ8wfaGxDFxi3ta4gj4nJUOa4z1chh7NtH5S6M1ilQ21P0eRIls0OanErjntXZxa56N6wQyGglwj5F-VHHn8BoAI0JkIybUBmKHwbbBJEzqxJ9RRZk";
  }

  return (
    <Link to={`/lesson/${lesson.contentBlobName}`} className="block">
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md">
        <div className="relative aspect-video">
          <img className="w-full h-full object-cover" src={getPlaceholderImage(lesson.category)} alt={lesson.title} />
          <div className="absolute top-4 left-4">
            <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{lesson.category}</span>
          </div>
          {lesson.price === 0 && (
            <div className="absolute top-4 right-4">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Free</span>
            </div>
          )}
        </div>
        <div className="p-8">
          <h3 className="font-headline font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">{lesson.title}</h3>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            <span className="text-sm font-medium text-on-surface-variant truncate">
              {lesson.author.slice(0, 6)}...{lesson.author.slice(-4)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-6 border-t border-outline-variant/15">
            <span className="font-headline font-bold text-2xl text-primary">
              {lesson.price > 0 ? `${lesson.price} APT` : 'Free'}
            </span>
            <span className="text-secondary font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Enroll Now <span className="material-symbols-outlined text-sm">chevron_right</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
