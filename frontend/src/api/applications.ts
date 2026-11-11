import { readError, API_URL } from './client'
import type { Application, ApplicationPayload, ApplicationStatus, ApplicationUpdate } from '../types'

export async function fetchApplications(): Promise<Application[]> {
  const response = await fetch(`${API_URL}/applications`)
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to fetch applications'))
  }
  const body = await response.json()
  return body?.data ?? []
}

export async function createApplication(payload: ApplicationPayload): Promise<void> {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to submit application'))
  }
}

export async function updateApplication(
  id: string,
  payload: ApplicationUpdate,
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to update application'))
  }
  const body = await response.json()
  if (!body?.data) {
    throw new Error('Backend did not return the updated application')
  }
  return body.data
}

export async function deleteApplication(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/applications/${id}`, { method: 'DELETE' })
  if (!response.ok) {
    throw new Error(await readError(response, 'Failed to delete application'))
  }
}
