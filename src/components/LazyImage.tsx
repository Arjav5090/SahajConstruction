import { useState } from 'react'
import sahajLogo from '../assets/Sahaj-logo.png'

export type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Above-the-fold / LCP, loads immediately, no fade gate */
  priority?: boolean
  /**
   * When true (default), show the Sahaj logo while a non-priority image is loading.
   * Set false for tiny icons or when a parent already provides a skeleton.
   */
  brandLoader?: boolean
}

/**
 * Lazy-loaded image with async decoding. Non-priority images fade in when decoded.
 * Use `priority` for hero/LCP images only.
 */
function LazyImage({
  priority,
  brandLoader = true,
  className = '',
  onLoad,
  alt,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const showBrandLoader = !priority && brandLoader && !loaded

  const fade = !priority ? 'transition-opacity duration-700 ease-out' : ''
  const opacity = loaded || priority ? 'opacity-100' : 'opacity-0'

  const isAbsoluteFill =
    typeof className === 'string' &&
    className.includes('absolute') &&
    className.includes('inset-0')

  /** Parent is usually `relative aspect-*` or fixed-height box; img uses h-full w-full to fill it */
  const wantsFillBox =
    typeof className === 'string' &&
    ((/\bh-full\b/.test(className) && /\bw-full\b/.test(className)) ||
      /\bsize-full\b/.test(className))

  const wrapperClassName = isAbsoluteFill
    ? 'absolute inset-0 overflow-hidden'
    : wantsFillBox
      ? 'relative block size-full min-h-0 min-w-0 overflow-hidden'
      : 'relative block w-full min-w-0 overflow-hidden'

  const imgClassName = [
    showBrandLoader ? (isAbsoluteFill ? 'z-2' : 'relative z-2') : '',
    fade,
    opacity,
    className,
  ]
    .filter(Boolean)
    .join(' ')
    .trim()

  return (
    <span className={wrapperClassName}>
      {showBrandLoader ? (
        <span
          className="pointer-events-none absolute inset-0 z-1 flex items-center justify-center bg-neutral-100"
          aria-hidden
        >
          <img
            src={sahajLogo}
            alt=""
            decoding="async"
            draggable={false}
            className="h-7 w-auto max-w-[min(140px,40%)] animate-pulse object-contain opacity-55"
          />
        </span>
      ) : null}
      <img
        {...props}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
        className={imgClassName}
      />
    </span>
  )
}

export default LazyImage
