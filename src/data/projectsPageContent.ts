import { overheadTankImages } from '../assets/overhead-tanks/images'
import { sewageTreatmentImages } from '../assets/sewage-treatment-plant/images'
import { stormWaterImages } from '../assets/storm-water/images'
import { waterSupplyImages } from '../assets/water-supply/images'

export const projectsIntro =
  'Some of the projects delivered and currently underway by Sahaj Construction across multiple states. This is a representative list and not the full portfolio.'

export type ProjectItem = {
  name: string
  location: string
  status: 'Completed' | 'Ongoing'
  image: string
  imageAlt: string
}

const projectPhotos = [
  ...waterSupplyImages,
  ...sewageTreatmentImages,
  ...stormWaterImages,
  ...overheadTankImages,
]

const rawProjects: Array<{ name: string; status: 'Completed' | 'Ongoing' }> = [
  { name: 'Damnagar', status: 'Completed' },
  { name: 'Liliya', status: 'Completed' },
  { name: 'Chhota Udaipur', status: 'Completed' },
  { name: 'Ankleshwar', status: 'Completed' },
  { name: 'Bharuch', status: 'Completed' },
  { name: 'Bidadi', status: 'Completed' },
  { name: 'Gadag', status: 'Completed' },
  { name: 'Rewa', status: 'Ongoing' },
  { name: 'Gwalior', status: 'Completed' },
  { name: 'Dhule', status: 'Ongoing' },
  { name: 'Kalyan', status: 'Completed' },
  { name: 'Kalyan WSS', status: 'Ongoing' },
  { name: 'Vijaydurg', status: 'Ongoing' },
  { name: 'Nagbhid', status: 'Ongoing' },
  { name: 'Sangli', status: 'Ongoing' },
  { name: 'Vapi', status: 'Ongoing' },
  { name: 'Valsad', status: 'Ongoing' },
  { name: 'Anand', status: 'Ongoing' },
  { name: 'Udgir', status: 'Ongoing' },
  { name: 'Nandurbar', status: 'Ongoing' },
  { name: 'Nagpur', status: 'Ongoing' },
]

/** Representative project list shared by the client (not full portfolio). */
export const placeholderProjects: ProjectItem[] = rawProjects.map((p, i) => {
  const img = projectPhotos[i % projectPhotos.length]
  return {
    name: p.name,
    location: p.name,
    status: p.status,
    image: img.src,
    imageAlt: img.alt,
  }
})
