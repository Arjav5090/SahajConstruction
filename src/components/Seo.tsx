import { useEffect } from 'react'
import { seoConfig } from '../seo/seoConfig'

type SeoProps = {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
}

const SEO_ATTRIBUTE = 'data-seo-managed'

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    tag.setAttribute(SEO_ATTRIBUTE, 'true')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.head.querySelector(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    tag.setAttribute(SEO_ATTRIBUTE, 'true')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertCanonical(url: string) {
  let tag = document.head.querySelector('link[rel="canonical"]')
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', 'canonical')
    tag.setAttribute(SEO_ATTRIBUTE, 'true')
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', url)
}

function upsertStructuredData(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  const existing = document.head.querySelector('script[type="application/ld+json"][data-seo-jsonld]')
  if (existing) existing.remove()

  const script = document.createElement('script')
  script.setAttribute('type', 'application/ld+json')
  script.setAttribute('data-seo-jsonld', 'true')
  script.text = JSON.stringify(data)
  document.head.appendChild(script)
}

function Seo({
  title,
  description,
  path,
  keywords,
  image = seoConfig.defaultImage,
  type = 'website',
  noindex = false,
  structuredData,
}: SeoProps) {
  useEffect(() => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const canonicalUrl = new URL(normalizedPath, seoConfig.siteUrl).toString()
    const ogImage = new URL(image, seoConfig.siteUrl).toString()
    const finalKeywords = keywords?.length
      ? keywords.join(', ')
      : seoConfig.defaultKeywords.join(', ')

    document.title = title

    upsertMetaByName('description', description)
    upsertMetaByName('keywords', finalKeywords)
    upsertMetaByName('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large')
    upsertMetaByName('googlebot', noindex ? 'noindex, nofollow' : 'index, follow')

    upsertMetaByProperty('og:type', type)
    upsertMetaByProperty('og:title', title)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:site_name', seoConfig.siteName)
    upsertMetaByProperty('og:url', canonicalUrl)
    upsertMetaByProperty('og:image', ogImage)

    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', title)
    upsertMetaByName('twitter:description', description)
    upsertMetaByName('twitter:image', ogImage)

    upsertCanonical(canonicalUrl)
    if (structuredData) upsertStructuredData(structuredData)
  }, [title, description, path, keywords, image, type, noindex, structuredData])

  return null
}

export default Seo
