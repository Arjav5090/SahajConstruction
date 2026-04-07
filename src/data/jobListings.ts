export type JobListing = {
  id: string
  title: string
  type: 'Full Time' | 'Contract'
  location: string
  deadline: string
  salary: string
  excerpt: string
}

export const jobListings: JobListing[] = [
  {
    id: '1',
    title: 'Civil Engineer, Site',
    type: 'Full Time',
    location: 'Surat / field sites',
    deadline: 'Rolling',
    salary: 'As per experience',
    excerpt:
      'Site execution, quality checks, and coordination for water & sanitation infrastructure projects.',
  },
  {
    id: '2',
    title: 'Project Manager',
    type: 'Full Time',
    location: 'Multi-state',
    deadline: 'Rolling',
    salary: 'As per experience',
    excerpt:
      'End-to-end planning, client coordination, and delivery for government EPC contracts.',
  },
  {
    id: '3',
    title: 'Quantity Surveyor',
    type: 'Full Time',
    location: 'Surat',
    deadline: 'Rolling',
    salary: 'As per experience',
    excerpt:
      'Estimation, billing, and measurement support for large-scale civil and utility works.',
  },
  {
    id: '4',
    title: 'Site Supervisor',
    type: 'Contract',
    location: 'Field',
    deadline: 'Rolling',
    salary: 'As per experience',
    excerpt:
      'Daily site supervision, safety compliance, and progress reporting.',
  },
  {
    id: '5',
    title: 'Accountant',
    type: 'Full Time',
    location: 'Surat (office)',
    deadline: 'Rolling',
    salary: 'As per experience',
    excerpt:
      'GST, billing, vendor payments, and statutory compliance for infrastructure and EPC work.',
  },
]
