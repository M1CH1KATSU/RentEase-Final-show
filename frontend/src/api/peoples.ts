import { readError, API_URL } from './client'
import type { Person, PersonUpdate } from '../types'

export async function fetchPeoples(): Promise<Person[]> {
  const response = await fetch(`${API_URL}/peoples`)
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to fetch peoples'))
  }
  const body = await response.json()
  return body?.data ?? []
}

export async function updatePerson(id: string, payload: PersonUpdate): Promise<Person> {
  const response = await fetch(`${API_URL}/peoples/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to update person'))
  }
  const body = await response.json()
  if (!body?.data) {
    throw new Error('Backend did not return the updated person')
  }
  return body.data
}

export async function deletePerson(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/peoples/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to delete person'))
  }
}
