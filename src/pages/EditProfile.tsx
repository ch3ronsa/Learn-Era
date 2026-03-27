import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../contexts/ProfileContext'
import { useWalletState } from '../components/WalletConnect'
import { shortAddress } from '../config'
import { CATEGORIES } from '../lib/categories'

const EXPERTISE_OPTIONS = CATEGORIES.map(c => c.label)

export function EditProfile() {
  const navigate = useNavigate()
  const { connected, address, connect } = useWalletState()
  const { profile, loading, updateProfile } = useProfile()

  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatar, setAvatar] = useState('')
  const [expertise, setExpertise] = useState<string[]>([])
  const [twitter, setTwitter] = useState('')
  const [github, setGithub] = useState('')
  const [website, setWebsite] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '')
      setBio(profile.bio || '')
      setAvatar(profile.avatar || '')
      setExpertise(profile.expertise || [])
      setTwitter(profile.socialLinks?.twitter || '')
      setGithub(profile.socialLinks?.github || '')
      setWebsite(profile.socialLinks?.website || '')
    }
  }, [profile])

  if (!connected) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">👤</div>
        <h2 className="text-xl font-extrabold text-[var(--color-chalk)] mb-2">Connect Wallet</h2>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">Connect your wallet to create or edit your profile.</p>
        <button onClick={connect} className="btn-pill btn-pill-primary btn-pill-lg">Connect Wallet</button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-sm text-[var(--color-text-muted)]">Loading profile...</p>
      </div>
    )
  }

  const toggleExpertise = (area: string) => {
    setExpertise(prev =>
      prev.includes(area) ? prev.filter(e => e !== area) : [...prev, area]
    )
  }

  const hasSocialLink = !!(twitter.trim() || github.trim() || website.trim())
  const canBeEducator = displayName.trim().length > 0 && bio.trim().length >= 50 && expertise.length > 0 && hasSocialLink
  const isEducator = profile?.role === 'educator'

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await updateProfile({
        displayName: displayName.trim(),
        bio: bio.trim(),
        avatar: avatar.trim(),
        expertise,
        socialLinks: {
          twitter: twitter.trim() || undefined,
          github: github.trim() || undefined,
          website: website.trim() || undefined,
        },
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleBecomeEducator = async () => {
    if (!canBeEducator) return
    setSaving(true)
    try {
      await updateProfile({
        displayName: displayName.trim(),
        bio: bio.trim(),
        avatar: avatar.trim(),
        expertise,
        socialLinks: {
          twitter: twitter.trim() || undefined,
          github: github.trim() || undefined,
          website: website.trim() || undefined,
        },
        role: 'educator',
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[var(--color-chalk)] mb-1">
          {profile ? 'Edit Profile' : 'Create Profile'}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          {shortAddress(address)} {isEducator && <span className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">Educator</span>}
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-container-lowest)] p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-[var(--color-chalk)] uppercase tracking-wider">Basic Info</h2>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Display Name *</label>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" className="edu-input" maxLength={50} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">
              Bio * <span className="font-normal text-[var(--color-text-muted)]">({bio.length}/50 min)</span>
            </label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} placeholder="Tell us about yourself and your expertise..." className="edu-input resize-y" maxLength={500} />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Avatar URL <span className="font-normal text-[var(--color-text-muted)]">(optional)</span></label>
            <input type="url" value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="https://..." className="edu-input" />
          </div>
        </section>

        {/* Expertise */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-container-lowest)] p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-[var(--color-chalk)] uppercase tracking-wider">Expertise Areas</h2>
          <p className="text-xs text-[var(--color-text-muted)]">Select at least one area you can teach.</p>
          <div className="flex flex-wrap gap-2">
            {EXPERTISE_OPTIONS.map(area => (
              <button
                key={area}
                onClick={() => toggleExpertise(area)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  expertise.includes(area)
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-primary hover:text-primary'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-container-lowest)] p-6 space-y-4">
          <h2 className="text-sm font-extrabold text-[var(--color-chalk)] uppercase tracking-wider">Social Links</h2>
          <p className="text-xs text-[var(--color-text-muted)]">At least one link is required to become an educator.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Twitter / X</label>
              <input type="text" value={twitter} onChange={e => setTwitter(e.target.value)} placeholder="@username" className="edu-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">GitHub</label>
              <input type="text" value={github} onChange={e => setGithub(e.target.value)} placeholder="username" className="edu-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-chalk)] mb-1.5">Website</label>
              <input type="url" value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://..." className="edu-input" />
            </div>
          </div>
        </section>

        {/* Educator Section */}
        {!isEducator && (
          <section className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 space-y-4">
            <h2 className="text-sm font-extrabold text-primary uppercase tracking-wider">Become an Educator</h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Complete these requirements to start publishing lessons:
            </p>
            <ul className="space-y-2 text-xs">
              <li className={`flex items-center gap-2 ${displayName.trim() ? 'text-primary font-semibold' : 'text-[var(--color-text-muted)]'}`}>
                {displayName.trim() ? '✓' : '○'} Display name filled
              </li>
              <li className={`flex items-center gap-2 ${bio.trim().length >= 50 ? 'text-primary font-semibold' : 'text-[var(--color-text-muted)]'}`}>
                {bio.trim().length >= 50 ? '✓' : '○'} Bio at least 50 characters
              </li>
              <li className={`flex items-center gap-2 ${expertise.length > 0 ? 'text-primary font-semibold' : 'text-[var(--color-text-muted)]'}`}>
                {expertise.length > 0 ? '✓' : '○'} At least 1 expertise area selected
              </li>
              <li className={`flex items-center gap-2 ${hasSocialLink ? 'text-primary font-semibold' : 'text-[var(--color-text-muted)]'}`}>
                {hasSocialLink ? '✓' : '○'} At least 1 social link added
              </li>
            </ul>
            <button
              onClick={handleBecomeEducator}
              disabled={!canBeEducator || saving}
              className="btn-pill btn-pill-primary btn-pill-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Become an Educator'}
            </button>
          </section>
        )}

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button onClick={handleSave} disabled={saving || !displayName.trim()} className="btn-pill btn-pill-primary btn-pill-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
          {saved && <span className="text-xs font-semibold text-primary">Profile saved!</span>}
          <button onClick={() => navigate(`/profile/${address}`)} className="btn-pill btn-pill-outline btn-pill-md">
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}
