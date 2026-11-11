import { Plus, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import type { PropertyPayload } from '../types'
import { DEFAULT_COVER } from '../data/mock'

const PROPERTY_TYPES = ['Apartment', 'House', 'Building', 'Studio', 'Duplex']
const FURNISHING = ['Furnished', 'Semi-Furnished', 'Unfurnished']

export default function AddPropertyModal({
  onClose,
  onSave,
  saving,
  error,
}: {
  onClose: () => void
  onSave: (payload: PropertyPayload) => void
  saving: boolean
  error: string
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const text = (key: string) => String(form.get(key) ?? '').trim()
    const num = (key: string) => Number(form.get(key))

    const payload: PropertyPayload = {
      title: text('title'),
      propertyType: text('propertyType'),
      price: num('price'),
      currency: 'BDT',
      pricePeriod: text('pricePeriod'),
      location: {
        address: text('address'),
        area: text('locationArea'),
        city: text('city'),
        country: text('country'),
      },
      specifications: {
        bedrooms: num('bedrooms'),
        bathrooms: num('baths'),
        area: num('specArea'),
        areaUnit: text('areaUnit'),
        balconies: num('balconies'),
        floor: num('floor'),
        totalFloors: num('totalFloors'),
        parkingSpaces: num('parking'),
      },
      images: { cover: text('cover') },
      status: text('status') as PropertyPayload['status'],
      furnished: text('furnished'),
      description: text('description'),
      landlord: { name: text('landlordName'), phone: text('landlordPhone') },
      availability: { availableFrom: text('availableFrom'), minimumStay: num('minimumStay') },
    }

    if (
      !payload.title || !payload.propertyType || !payload.price || payload.price <= 0 ||
      !payload.location.address || !payload.location.area || !payload.location.city || !payload.location.country ||
      !payload.images.cover || !payload.landlord.name || !payload.landlord.phone ||
      !payload.availability.availableFrom || !payload.description
    ) {
      return
    }

    onSave(payload)
  }

  return (
    <div className="re-modal-backdrop" onMouseDown={onClose}>
      <section
        className="re-modal glass-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-property-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="re-modal-header">
          <div>
            <span className="section-kicker">PROPERTY MANAGEMENT</span>
            <h2 id="add-property-title">Add a new property</h2>
            <p>Create a property listing for your portfolio.</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="re-form-grid">
            <label className="re-field">
              Property name <span>*</span>
              <input name="title" placeholder="e.g. Maple Residence" required maxLength={80} autoFocus />
            </label>
            <label className="re-field">
              Property type <span>*</span>
              <select name="propertyType" defaultValue="Apartment" required>
                {PROPERTY_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </label>
          </div>

          <div className="re-form-grid">
            <label className="re-field">
              Monthly rent (৳) <span>*</span>
              <input name="price" type="number" min="1" step="1" placeholder="45000" required />
            </label>
            <label className="re-field">
              Price period <span>*</span>
              <select name="pricePeriod" defaultValue="MONTH" required>
                <option value="MONTH">Per month</option>
                <option value="YEAR">Per year</option>
              </select>
            </label>
            <label className="re-field">
              Availability <span>*</span>
              <select name="status" defaultValue="Available" required>
                <option value="Available">Available</option>
                <option value="Ocupied">Occupied</option>
              </select>
            </label>
            <label className="re-field">
              Furnishing <span>*</span>
              <select name="furnished" defaultValue="Semi-Furnished" required>
                {FURNISHING.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          </div>

          <label className="re-field re-textarea">
            Description <span>*</span>
            <textarea name="description" rows={3} placeholder="Describe the property…" required maxLength={400} />
          </label>

          <span className="re-group-kicker">Location</span>
          <div className="re-form-grid">
            <label className="re-field">
              Address <span>*</span>
              <input name="address" placeholder="House 12, Road 45" required maxLength={120} />
            </label>
            <label className="re-field">
              Area <span>*</span>
              <input name="locationArea" placeholder="e.g. Gulshan 2" required maxLength={80} />
            </label>
            <label className="re-field">
              City <span>*</span>
              <input name="city" placeholder="e.g. Dhaka" required maxLength={60} />
            </label>
            <label className="re-field">
              Country <span>*</span>
              <input name="country" placeholder="e.g. Bangladesh" required maxLength={60} />
            </label>
          </div>

          <span className="re-group-kicker">Specifications</span>
          <div className="re-form-grid re-spec-grid">
            <label className="re-field">
              Bedrooms <span>*</span>
              <input name="bedrooms" type="number" min="0" max="30" defaultValue="3" required />
            </label>
            <label className="re-field">
              Bathrooms <span>*</span>
              <input name="baths" type="number" min="0" max="30" defaultValue="2" required />
            </label>
            <label className="re-field">
              Area <span>*</span>
              <input name="specArea" type="number" min="0" defaultValue="1350" required />
            </label>
            <label className="re-field">
              Area unit <span>*</span>
              <select name="areaUnit" defaultValue="ft²" required>
                <option value="ft²">ft²</option>
                <option value="sqft">sqft</option>
                <option value="m²">m²</option>
              </select>
            </label>
            <label className="re-field">
              Balconies <span>*</span>
              <input name="balconies" type="number" min="0" max="10" defaultValue="1" required />
            </label>
            <label className="re-field">
              Floor <span>*</span>
              <input name="floor" type="number" min="0" max="200" defaultValue="2" required />
            </label>
            <label className="re-field">
              Total floors <span>*</span>
              <input name="totalFloors" type="number" min="0" max="200" defaultValue="8" required />
            </label>
            <label className="re-field">
              Parking spaces <span>*</span>
              <input name="parking" type="number" min="0" max="20" defaultValue="1" required />
            </label>
          </div>

          <label className="re-field">
            Cover image URL <span>*</span>
            <input name="cover" type="url" defaultValue={DEFAULT_COVER} required maxLength={500} />
          </label>

          <span className="re-group-kicker">Landlord & availability</span>
          <div className="re-form-grid">
            <label className="re-field">
              Landlord name <span>*</span>
              <input name="landlordName" placeholder="e.g. Rahim Ahmed" required maxLength={80} />
            </label>
            <label className="re-field">
              Landlord phone <span>*</span>
              <input name="landlordPhone" placeholder="+8801XXXXXXXXX" required maxLength={20} />
            </label>
            <label className="re-field">
              Available from <span>*</span>
              <input name="availableFrom" type="date" required />
            </label>
            <label className="re-field">
              Minimum stay (months) <span>*</span>
              <input name="minimumStay" type="number" min="1" max="60" defaultValue="6" required />
            </label>
          </div>

          {error && <p className="re-form-error">{error}</p>}

          <div className="re-modal-actions">
            <button type="button" className="filter-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button" disabled={saving}>
              <Plus size={17} />{saving ? 'Saving…' : 'Save property'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
