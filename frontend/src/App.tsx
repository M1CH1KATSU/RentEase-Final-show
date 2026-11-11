import { useCallback, useEffect, useState } from 'react'
import type { Application, Person, PersonUpdate, Property, PropertyPayload, Role } from './types'
import { X } from 'lucide-react'
import { createApplication, deleteApplication, fetchApplications, updateApplication } from './api/applications'
import { createProperty, deleteProperty, fetchProperties } from './api/properties'
import { deletePerson, fetchPeoples, updatePerson } from './api/peoples'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import PropertiesPage from './components/PropertiesPage'
import ApplicationsPage from './components/ApplicationsPage'
import PeoplesPage from './components/PeoplesPage'
import RecordsPage from './components/RecordsPage'
import AddPropertyModal from './components/AddPropertyModal'
import PropertyDetailsModal from './components/PropertyDetailsModal'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
import ApplyPropertyModal from './components/ApplyPropertyModal'
import ApplicationDetailsModal from './components/ApplicationDetailsModal'
import EditApplicationModal, { type ApplicationEditInput } from './components/EditApplicationModal'
import PersonDetailsModal from './components/PersonDetailsModal'
import EditPersonModal from './components/EditPersonModal'
import MobileNav from './components/MobileNav'
import { displayStatus } from './utils/format'

export default function App() {
  const [active, setActive] = useState('Overview')
  const [role, setRole] = useState<Role>('Admin')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [savingProperty, setSavingProperty] = useState(false)
  const [propertyError, setPropertyError] = useState('')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [propertyDeleteTarget, setPropertyDeleteTarget] = useState<Property | null>(null)
  const [propertyDeleteSaving, setPropertyDeleteSaving] = useState(false)
  const [propertyDeleteError, setPropertyDeleteError] = useState('')
  const [applyTarget, setApplyTarget] = useState<Property | null>(null)

  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [applications, setApplications] = useState<Application[]>([])
  const [applicationsLoading, setApplicationsLoading] = useState(true)
  const [applicationsError, setApplicationsError] = useState('')
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [editTarget, setEditTarget] = useState<Application | null>(null)
  const [editSaving, setEditSaving] = useState(false)
  const [editError, setEditError] = useState('')
  const [applicationDeleteTarget, setApplicationDeleteTarget] = useState<Application | null>(null)
  const [applicationDeleteSaving, setApplicationDeleteSaving] = useState(false)
  const [applicationDeleteError, setApplicationDeleteError] = useState('')

  const [peoples, setPeoples] = useState<Person[]>([])
  const [peoplesLoading, setPeoplesLoading] = useState(true)
  const [peoplesError, setPeoplesError] = useState('')
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [editPersonTarget, setEditPersonTarget] = useState<Person | null>(null)
  const [editPersonSaving, setEditPersonSaving] = useState(false)
  const [editPersonError, setEditPersonError] = useState('')
  const [personDeleteTarget, setPersonDeleteTarget] = useState<Person | null>(null)
  const [personDeleteSaving, setPersonDeleteSaving] = useState(false)
  const [personDeleteError, setPersonDeleteError] = useState('')

  const loadProperties = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setProperties(await fetchProperties())
    } catch {
      setError('Could not load properties. Make sure the backend API is running.')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadApplications = useCallback(async () => {
    setApplicationsLoading(true)
    setApplicationsError('')
    try {
      setApplications(await fetchApplications())
    } catch {
      setApplicationsError('Could not load applications. Make sure the backend API is running.')
    } finally {
      setApplicationsLoading(false)
    }
  }, [])

  const loadPeoples = useCallback(async () => {
    setPeoplesLoading(true)
    setPeoplesError('')
    try {
      setPeoples(await fetchPeoples())
    } catch {
      setPeoplesError('Could not load people. Make sure the backend API is running.')
    } finally {
      setPeoplesLoading(false)
    }
  }, [])

  useEffect(() => {
    loadProperties()
    loadApplications()
    loadPeoples()
  }, [loadProperties, loadApplications, loadPeoples])

  async function addProperty(payload: PropertyPayload) {
    setSavingProperty(true)
    setPropertyError('')
    try {
      const created = await createProperty(payload)
      setProperties((current) => [...current, created])
      setShowAddProperty(false)
      setActive('Properties')
      await loadPeoples()
    } catch (err) {
      setPropertyError(err instanceof Error ? err.message : 'Failed to create property')
    } finally {
      setSavingProperty(false)
    }
  }

  function requestDeleteProperty(property: Property) {
    setSelectedProperty(null)
    setPropertyDeleteError('')
    setPropertyDeleteTarget(property)
  }

  async function confirmDeleteProperty(property: Property) {
    setPropertyDeleteSaving(true)
    setPropertyDeleteError('')
    try {
      await deleteProperty(property._id)
      setProperties((current) => current.filter((item) => item._id !== property._id))
      setPropertyDeleteTarget(null)
    } catch (err) {
      setPropertyDeleteError(err instanceof Error ? err.message : 'Failed to delete property')
    } finally {
      setPropertyDeleteSaving(false)
    }
  }

  async function applyForProperty(property: Property, payload: { applicant: { name: string; email: string; phone: string }; message?: string }) {
    await createApplication({ propertyId: property._id, ...payload })
    await loadApplications()
    await loadPeoples()
  }

  function requestDetailsPerson(person: Person) {
    setSelectedPerson(person)
  }

  function requestEditPerson(person: Person) {
    setSelectedPerson(null)
    setEditPersonError('')
    setEditPersonTarget(person)
  }

  async function savePersonEdit(person: Person, payload: PersonUpdate) {
    setEditPersonSaving(true)
    setEditPersonError('')
    try {
      const updated = await updatePerson(person._id, payload)
      setPeoples((current) => current.map((item) => (
        item._id === updated._id ? { ...item, ...updated } : item
      )))
      setEditPersonTarget(null)
    } catch (err) {
      setEditPersonError(err instanceof Error ? err.message : 'Failed to update person')
    } finally {
      setEditPersonSaving(false)
    }
  }

  function requestDeletePerson(person: Person) {
    setSelectedPerson(null)
    setPersonDeleteError('')
    setPersonDeleteTarget(person)
  }

  async function confirmDeletePerson(person: Person) {
    setPersonDeleteSaving(true)
    setPersonDeleteError('')
    try {
      await deletePerson(person._id)
      setPeoples((current) => current.filter((item) => item._id !== person._id))
      setPersonDeleteTarget(null)
    } catch (err) {
      setPersonDeleteError(err instanceof Error ? err.message : 'Failed to delete person')
    } finally {
      setPersonDeleteSaving(false)
    }
  }

  function requestEditApplication(application: Application) {
    setSelectedApplication(null)
    setEditError('')
    setEditTarget(application)
  }

  async function saveApplicationEdit(application: Application, payload: ApplicationEditInput) {
    setEditSaving(true)
    setEditError('')
    try {
      const updated = await updateApplication(application._id, payload)
      setApplications((current) => current.map((item) => (item._id === updated._id ? updated : item)))
      setEditTarget(null)
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Failed to update application')
    } finally {
      setEditSaving(false)
    }
  }

  function requestDeleteApplication(application: Application) {
    setSelectedApplication(null)
    setApplicationDeleteError('')
    setApplicationDeleteTarget(application)
  }

  async function confirmDeleteApplication(application: Application) {
    setApplicationDeleteSaving(true)
    setApplicationDeleteError('')
    try {
      await deleteApplication(application._id)
      setApplications((current) => current.filter((item) => item._id !== application._id))
      setApplicationDeleteTarget(null)
    } catch (err) {
      setApplicationDeleteError(err instanceof Error ? err.message : 'Failed to delete application')
    } finally {
      setApplicationDeleteSaving(false)
    }
  }

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <Sidebar active={active} onChange={setActive} applicationCount={applications.length} peopleCount={peoples.length} />
      {mobileMenu && (
        <div className="mobile-sheet">
          <button className="sheet-backdrop" aria-label="Close menu" onClick={() => setMobileMenu(false)} />
          <div className="sheet-panel glass-panel">
            <div className="sheet-head"><strong>Menu</strong><button className="icon-button" onClick={() => setMobileMenu(false)} aria-label="Close menu"><X size={19} /></button></div>
            {['Overview', 'Properties', 'People', 'Applications', 'Payments'].map((item) => (
              <button key={item} className="nav-item" onClick={() => { setActive(item); setMobileMenu(false) }}>{item}</button>
            ))}
          </div>
        </div>
      )}
      <div className="main-shell">
        <Topbar role={role} setRole={setRole} onMenu={() => setMobileMenu(true)} />
        <main className="main-content">
          {active === 'Overview' && (
            <Dashboard
              role={role}
              properties={properties}
              onNavigate={setActive}
              onAddProperty={() => setShowAddProperty(true)}
              onViewDetails={setSelectedProperty}
              loading={loading}
              error={error}
              onRetry={loadProperties}
            />
          )}
          {active === 'Properties' && (
            <PropertiesPage
              properties={properties}
              loading={loading}
              error={error}
              onRetry={loadProperties}
              onAddProperty={() => setShowAddProperty(true)}
              onViewDetails={setSelectedProperty}
            />
          )}
          {active === 'Applications' && (
            <ApplicationsPage
              applications={applications}
              loading={applicationsLoading}
              error={applicationsError}
              onRetry={loadApplications}
              onViewDetails={setSelectedApplication}
              onEdit={setEditTarget}
              onDelete={requestDeleteApplication}
            />
          )}
          {active === 'People' && (
            <PeoplesPage
              peoples={peoples}
              loading={peoplesLoading}
              error={peoplesError}
              onRetry={loadPeoples}
              onViewDetails={requestDetailsPerson}
              onEdit={requestEditPerson}
              onDelete={requestDeletePerson}
            />
          )}
          {['Leases', 'Payments', 'Maintenance', 'Settings'].includes(active) && (
            <RecordsPage page={active} />
          )}
        </main>
      </div>
      <MobileNav active={active} onChange={setActive} />
      {showAddProperty && (
        <AddPropertyModal
          onClose={() => { setShowAddProperty(false); setPropertyError('') }}
          onSave={addProperty}
          saving={savingProperty}
          error={propertyError}
        />
      )}
      {selectedProperty && (
        <PropertyDetailsModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onApply={setApplyTarget}
          onDelete={requestDeleteProperty}
        />
      )}
      {propertyDeleteTarget && (
        <ConfirmDeleteModal
          title="Delete this property?"
          description={<>You are about to permanently delete <strong className="cf-strong">{propertyDeleteTarget.title}</strong> ({displayStatus(propertyDeleteTarget.status)}) from your portfolio. This action cannot be undone.</>}
          saving={propertyDeleteSaving}
          error={propertyDeleteError}
          onClose={() => setPropertyDeleteTarget(null)}
          onConfirm={() => confirmDeleteProperty(propertyDeleteTarget)}
        />
      )}
      {applyTarget && (
        <ApplyPropertyModal
          property={applyTarget}
          onClose={() => setApplyTarget(null)}
          onApply={(payload) => applyForProperty(applyTarget, payload)}
        />
      )}
      {selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onEdit={requestEditApplication}
          onDelete={requestDeleteApplication}
        />
      )}
      {selectedPerson && (
        <PersonDetailsModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
          onEdit={requestEditPerson}
          onDelete={requestDeletePerson}
          onViewProperty={(property) => { setSelectedPerson(null); setSelectedProperty(property) }}
        />
      )}
      {editPersonTarget && (
        <EditPersonModal
          person={editPersonTarget}
          saving={editPersonSaving}
          error={editPersonError}
          onClose={() => setEditPersonTarget(null)}
          onSave={savePersonEdit}
        />
      )}
      {personDeleteTarget && (
        <ConfirmDeleteModal
          title={`Delete ${personDeleteTarget.name}?`}
          description={<>You are about to permanently remove <strong className="cf-strong">{personDeleteTarget.name}</strong> ({personDeleteTarget.role}) from your workspace. This action cannot be undone.</>}
          confirmLabel={`Yes, delete ${personDeleteTarget.name.split(' ')[0]}`}
          saving={personDeleteSaving}
          error={personDeleteError}
          onClose={() => setPersonDeleteTarget(null)}
          onConfirm={() => confirmDeletePerson(personDeleteTarget)}
        />
      )}
      {editTarget && (
        <EditApplicationModal
          application={editTarget}
          saving={editSaving}
          error={editError}
          onClose={() => setEditTarget(null)}
          onSave={saveApplicationEdit}
        />
      )}
      {applicationDeleteTarget && (
        <ConfirmDeleteModal
          title="Delete this application?"
          description={<>You are about to permanently delete the application of <strong className="cf-strong">{applicationDeleteTarget.applicant.name}</strong> for <strong className="cf-strong">{applicationDeleteTarget.propertyTitle}</strong>. This action cannot be undone.</>}
          saving={applicationDeleteSaving}
          error={applicationDeleteError}
          onClose={() => setApplicationDeleteTarget(null)}
          onConfirm={() => confirmDeleteApplication(applicationDeleteTarget)}
        />
      )}
    </div>
  )
}
