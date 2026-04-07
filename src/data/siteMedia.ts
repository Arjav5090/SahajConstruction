import { constructionEquipmentImages } from '../assets/construction-equipment/images'
import { overheadTankImages } from '../assets/overhead-tanks/images'
import { sewageTreatmentImages } from '../assets/sewage-treatment-plant/images'
import { stormWaterImages } from '../assets/storm-water/images'
import { waterSupplyImages } from '../assets/water-supply/images'

/** Default inner-page hero when `imageUrl` is omitted */
export const fallbackHeroImage = constructionEquipmentImages[0]

/** Curated picks for page heroes and key sections, real project photography */
export const homeHero = sewageTreatmentImages[0]
export const homeAbout = overheadTankImages[0]
export const homeWhyBand = stormWaterImages[0]

export const pageHeroImages = {
  about: constructionEquipmentImages[3],
  business: waterSupplyImages[1],
  projects: stormWaterImages[3],
  contact: overheadTankImages[2],
  careers: constructionEquipmentImages[2],
  faq: waterSupplyImages[3],
} as const

/** Business page, bento cards + section headers */
export const businessBentoMedia = {
  water: waterSupplyImages[0],
  sewerage: sewageTreatmentImages[1],
  storm: stormWaterImages[1],
} as const
