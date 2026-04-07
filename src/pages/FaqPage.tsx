import FaqContentSection from '../components/FaqContentSection'
import PageHero from '../components/PageHero'
import PageShell from '../components/PageShell'
import Seo from '../components/Seo'
import { faqItems } from '../data/faqContent'
import { pageHeroImages } from '../data/siteMedia'

function FaqPage() {
  return (
    <>
      <Seo
        title="FAQ | Sahaj Construction"
        description="Find answers to common questions about Sahaj Construction's government EPC projects, service scope, operating regions, quality process, and enquiry flow."
        path="/faq"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        }}
      />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Support"
        imageUrl={pageHeroImages.faq.src}
        imageAlt={pageHeroImages.faq.alt}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'FAQ', to: '/faq' },
        ]}
      />
      <PageShell wide>
        <FaqContentSection />
      </PageShell>
    </>
  )
}

export default FaqPage
