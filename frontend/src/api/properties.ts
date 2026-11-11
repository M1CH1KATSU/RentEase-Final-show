import { readError, API_URL } from './client'
import type { Property, PropertyPayload } from '../types'

export async function fetchProperties(): Promise<Property[]> {
  const response = await fetch(`${API_URL}/properties`)
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to fetch properties'))
  }
  const body = await response.json()
  return body?.data ?? []
}

export async function fetchPropertyById(id: string): Promise<Property> {
  const response = await fetch(`${API_URL}/properties/${id}`)
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to fetch property'))
  }
  const body = await response.json()
  if (!body?.data) {
    throw new Error('Property not found')
  }
  return body.data
}

export async function createProperty(payload: PropertyPayload): Promise<Property> {
  const response = await fetch(`${API_URL}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to create property'))
  }
  const body = await response.json()
  if (!body?.data) {
    throw new Error('Backend did not return the created property')
  }
  return body.data
}

export async function deleteProperty(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/properties/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to delete property'))
  }
}
