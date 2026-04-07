import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import LazyImage from '../components/LazyImage'
import PageHero from '../components/PageHero'
import PageShell from '../components/PageShell'
import Seo from '../components/Seo'
import { pageHeroImages } from '../data/siteMedia'
import { placeholderProjects, projectsIntro } from '../data/projectsPageContent'

function ProjectsPage() {
  return (
    <>
      <Seo
        title="Projects Gallery | Sahaj Construction Infrastructure Portfolio"
        description="Browse representative Sahaj Construction projects delivered across states in water infrastructure, sewerage systems, and urban drainage development."
        path="/projects-gallery"
      />
      <PageHero
        title="Our Projects"
        subtitle="Portfolio"
        imageUrl={pageHeroImages.projects.src}
        imageAlt={pageHeroImages.projects.alt}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Our Projects', to: '/projects-gallery' },
        ]}
      />
      <PageShell wide>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-wide text-[#0c8894]">
              Our best work
            </p>
            <h2 className="mt-2 text-3xl font-bold text-[#000000] sm:text-4xl">
              Infrastructure delivered across states
            </h2>
            <p className="mt-4 font-normal leading-relaxed text-[#494949]">
              {projectsIntro}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderProjects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="group overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
                <LazyImage
                  src={project.image}
                  alt={project.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                    project.status === 'Completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <div className="px-4 py-4">
                <h3 className="text-base font-bold text-[#000000]">{project.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[#494949]">
                  <MapPin className="h-4 w-4 text-[#0c8894]" />
                  {project.location}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#494949]">
          This is a representative list of projects and not the full portfolio.
        </p>

        <div className="mt-10 flex justify-center">
          <Link
            to="/contact-us"
            className="inline-flex rounded-none bg-[#0c8894] px-10 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_4px_20px_rgba(12,136,148,0.35)] transition hover:bg-[#2ea2a3]"
          >
            Discuss a project
          </Link>
        </div>
      </PageShell>
    </>
  )
}

export default ProjectsPage
