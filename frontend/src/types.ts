import type { ComponentType } from 'react'

export type Role = 'Admin' | 'Landlord' | 'Tenant'

export type Icon = ComponentType<{ size?: number; strokeWidth?: number; className?: string }>

export type PropertyStatus = 'Available' | 'Ocupied'

export interface Property {
  _id: string
  title: string
  slug: string
  propertyType: string
  price: number
  currency: 'BDT'
  pricePeriod: string
  location: {
    address: string
    area: string
    city: string
    country: string
  }
  specifications: {
    bedrooms: number
    bathrooms: number
    area: number
    areaUnit: string
    balconies: number
    floor: number
    totalFloors: number
    parkingSpaces: number
  }
  images: {
    cover: string
  }
  status: PropertyStatus
  furnished: string
  description: string
  amenities?: string[]
  features?: {
    petFriendly: boolean
    airConditioning: boolean
    wifi: boolean
    attachedBathroom: boolean
  }
  landlord: {
    name: string
    phone: string
    avatar?: string
    verified?: boolean
  }
  availability: {
    availableFrom: string
    minimumStay: number
  }
  stats?: {
    views: number
    favorites: number
  }
  createdAt: string
  updatedAt: string
}

export type PropertyPayload = Omit<Property, '_id' | 'slug' | 'stats' | 'createdAt' | 'updatedAt'>

export interface ApplicationPayload {
  propertyId: string
  applicant: {
    name: string
    email: string
    phone: string
  }
  message?: string
}

export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected'

export interface ApplicationUpdate {
  status?: ApplicationStatus
  applicant?: {
    name: string
    email: string
    phone: string
  }
  message?: string | null
}

export interface Application {
  _id: string
  propertyId: string
  propertyTitle: string
  applicant: {
    name: string
    email: string
    phone: string
  }
  message?: string | null
  status: ApplicationStatus
  createdAt: string
  updatedAt: string
}

export interface Person {
  _id: string
  phone: string
  name: string
  role: string
  email?: string
  properties: Property[]
  applications: Application[]
  appliedProperties: Property[]
  createdAt: string
  updatedAt: string
}

export interface PersonUpdate {
  name?: string
  phone?: string
  email?: string | null
  role?: string
}
