import { companyInfo } from '../data/companyInfo'

export const seoConfig = {
  siteName: 'Sahaj Construction',
  siteUrl: 'https://www.sahajconstruction.in',
  defaultTitle: 'Sahaj Construction | EPC Water, Sewerage & Infrastructure Projects',
  defaultDescription:
    'Sahaj Construction India LLP delivers government EPC infrastructure projects across India, including water supply, sewerage, storm water, and treatment plants.',
  defaultImage: '/favicon.svg',
  defaultKeywords: [
    'Sahaj Construction',
    'EPC contractor India',
    'water supply projects',
    'sewerage projects',
    'storm water drainage',
    'STP construction',
    'government infrastructure contractor',
    'civil construction company Surat',
    'infrastructure projects Gujarat',
  ],
  organization: {
    legalName: companyInfo.legalName,
    shortName: companyInfo.shortName,
    email: companyInfo.email,
    phone: companyInfo.phoneDisplay,
    address: companyInfo.registeredOfficeLines,
  },
} as const

export const routePaths = [
  '/',
  '/about-us',
  '/our-business',
  '/projects-gallery',
  '/faq',
  '/careers',
  '/contact-us',
] as const
