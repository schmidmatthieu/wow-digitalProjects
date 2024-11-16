export interface Project {
  id: string
  name: string
  description: string
  status: 'in_development' | 'in_maintenance' | 'in_production' | 'upcoming' | 'archived'
  type: 'frontend' | 'backend' | 'figma'
  client: string
  thumbnail: string
  created_at: string
  environments: {
    development?: {
      frontend?: string
      backend?: string
    }
    production?: {
      frontend?: string
      backend?: string
    }
    staging?: {
      frontend?: string
      backend?: string
    }
    figma?: string
  }
  techStack: string[]
}

export interface ProjectFilters {
  status: string[]
  search: string
  sort: {
    by: string
    order: 'asc' | 'desc'
  }
}