import { sewageTreatmentImages } from '../assets/sewage-treatment-plant/images'
import { stormWaterImages } from '../assets/storm-water/images'
import { waterSupplyImages } from '../assets/water-supply/images'

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Our Business', href: '/our-business' },
  { label: 'Our Projects', href: '/projects-gallery' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact-us' },
]

export const services = [
  {
    title: 'Water Supply Projects',
    desc: 'End-to-end EPC delivery for treatment, transmission, and public distribution systems.',
    icon: '💧',
  },
  {
    title: 'Sewerage Networks',
    desc: 'Underground sewer lines, pumping infrastructure, and associated civil utility works.',
    icon: '🛠️',
  },
  {
    title: 'Storm Water Pipelines',
    desc: 'High-performance drainage pipeline infrastructure designed for urban resilience.',
    icon: '🌧️',
  },
  {
    title: 'Irrigation Networks',
    desc: 'Turnkey irrigation pipeline projects supporting agricultural and regional development.',
    icon: '🌱',
  },
]

export const strengths = [
  'Easy Approach',
  'Trusted Firm',
  'Qualified Team',
  'Quality Output',
  'Cost Effective Solutions',
  'Vast Network',
  'Quality Infrastructure',
  'Quality Assurance',
]

/** Optional preview tiles, same photography as main site */
export const projectImages = [
  {
    title: 'Water treatment & transmission',
    image: waterSupplyImages[1].src,
  },
  {
    title: 'Sewage treatment plant delivery',
    image: sewageTreatmentImages[0].src,
  },
  {
    title: 'Storm water & drainage works',
    image: stormWaterImages[2].src,
  },
]
