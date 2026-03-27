import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { LessonCard } from '../components/LessonCard'
import { getDemoLessons } from '../lib/demo-lessons'
import { shortAddress } from '../config'
import { useProfile } from '../contexts/ProfileContext'
import { getProfile as fetchProfile } from '../lib/profile-storage'
import { useWalletState } from '../components/WalletConnect'
import type { UserProfile } from '../types'

export function Profile() {
  const { address } = useParams<{ address: string }>()
  const { address: myAddress } = useWalletState()
  const { profile: myProfile } = useProfile()

  const [viewProfile, setViewProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const isOwnProfile = address === myAddress

  useEffect(() => {
    if (!address) return
    if (isOwnProfile && myProfile) {
      setViewProfile(myProfile)
      setLoading(false)
    } else {
      setLoading(true)
      fetchProfile(address).then(p => {
        setViewProfile(p)
        setLoading(false)
      })
    }
  }, [address, isOwnProfile, myProfile])

  if (!address) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-[var(--color-text-muted)]">No profile address.</p>
      </div>
    )
  }

  const lessons = getDemoLessons().filter(l => l.author === address)
  const displayName = viewProfile?.displayName || 'Anonymous'
  const isEducator = viewProfile?.role === 'educator'

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="flex items-start gap-5 mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-tertiary flex items-center justify-center text-white font-extrabold text-xl shrink-0">
          {viewProfile?.avatar ? (
            <img src={viewProfile.avatar} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            displayName.slice(0, 2).toUpperCase()
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-extrabold text-[var(--color-chalk)]">{displayName}</h1>
            {isEducator && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                Educator
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] font-mono mt-0.5">{shortAddress(address)}</p>
          {viewProfile?.bio && (
            <p className="text-sm text-[var(--color-text-muted)] mt-2 leading-relaxed">{viewProfile.bio}</p>
          )}
          {viewProfile?.expertise && viewProfile.expertise.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {viewProfile.expertise.map(e => (
                <span key={e} className="px-2.5 py-1 rounded-full bg-[var(--color-surface-container)] text-xs font-medium text-[var(--color-text-muted)]">{e}</span>
              ))}
            </div>
          )}
          {/* Social Links */}
          {viewProfile?.socialLinks && (
            <div className="flex gap-3 mt-3">
              {viewProfile.socialLinks.twitter && (
                <a href={`https://twitter.com/${viewProfile.socialLinks.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-semibold">Twitter</a>
              )}
              {viewProfile.socialLinks.github && (
                <a href={`https://github.com/${viewProfile.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-semibold">GitHub</a>
              )}
              {viewProfile.socialLinks.website && (
                <a href={viewProfile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-semibold">Website</a>
              )}
            </div>
          )}
        </div>
        {isOwnProfile && (
          <Link to="/profile/edit" className="btn-pill btn-pill-outline btn-pill-sm shrink-0">
            Edit Profile
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-5 mb-10">
        {[
          { label: 'Lessons', value: lessons.length },
          { label: 'Categories', value: new Set(lessons.map(l => l.category)).size },
          { label: 'Free', value: lessons.filter(l => l.price === 0).length, color: 'var(--color-green)' },
        ].map(s => (
          <div key={s.label} className="edu-card p-5">
            <p className="text-xs text-[var(--color-text-muted)] mb-1 font-medium uppercase tracking-wider">{s.label}</p>
            <p className="text-2xl font-extrabold" style={{ color: s.color || 'var(--color-chalk)' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Lessons */}
      <h2 className="text-lg font-extrabold text-[var(--color-chalk)] mb-5">Published Lessons</h2>
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lessons.map(lesson => <LessonCard key={lesson.contentBlobName} lesson={lesson} />)}
        </div>
      ) : (
        <div className="text-center py-16 edu-card">
          <p className="text-[var(--color-text-muted)] mb-3">No lessons published yet.</p>
          {isOwnProfile && isEducator ? (
            <Link to="/create" className="text-primary text-sm no-underline font-semibold hover:underline">Create Your First Lesson</Link>
          ) : (
            <Link to="/explore" className="text-primary text-sm no-underline font-semibold hover:underline">Browse Courses</Link>
          )}
        </div>
      )}
    </div>
  )
}
