interface VideoPlayerProps {
  videoUrl?: string
  videoBlobUrl?: string
  title?: string
}

function getEmbedUrl(url: string): string | null {
  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  )
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null
}

export function VideoPlayer({ videoUrl, videoBlobUrl, title }: VideoPlayerProps) {
  // Direct video from Shelby blob
  if (videoBlobUrl) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
        <video
          src={videoBlobUrl}
          controls
          className="w-full h-full object-contain"
          title={title}
        />
      </div>
    )
  }

  // YouTube/Vimeo embed
  if (videoUrl) {
    const embedUrl = getEmbedUrl(videoUrl)
    if (embedUrl) {
      return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={embedUrl}
            title={title || 'Video'}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }

    // Fallback: direct link
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-[var(--color-surface-container)] flex items-center justify-center">
        <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="btn-pill btn-pill-primary btn-pill-md">
          Open Video
        </a>
      </div>
    )
  }

  return null
}

/** Validate if a URL is a supported video embed */
export function isValidVideoUrl(url: string): boolean {
  return !!getEmbedUrl(url)
}
