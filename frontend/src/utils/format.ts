import type { Property } from '../types'

export function formatPrice(property: Property): string {
  const amount = property.price.toLocaleString('en-BD')
  return `৳${amount}`
}

export function formatPricePeriod(property: Property): string {
  return property.pricePeriod.toLowerCase() === 'year' ? '/yr' : '/mo'
}

export function displayStatus(status: string): string {
  return status.toLowerCase() === 'ocupied' ? 'Occupied' : status
}

export function statusClass(status: string): string {
  return status.toLowerCase() === 'ocupied' ? 'occupied' : 'available'
}

export function formatShortDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatLongDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return date.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
