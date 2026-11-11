import type { Icon } from '../types'
import {
  Building2,
  CalendarDays,
  CircleDollarSign,
  FileCheck2,
  FileText,
  House,
  LayoutDashboard,
  Users,
  Wrench,
} from 'lucide-react'

export const navItems: { label: string; icon: Icon }[] = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Properties', icon: Building2 },
  { label: 'People', icon: Users },
  { label: 'Applications', icon: FileText },
  { label: 'Payments', icon: CircleDollarSign },
]

export const roleData = {
  Admin: {
    eyebrow: 'Dashboard Overview',
    title: 'Your Home, Our Responsibility.',
    subtitle: '',
    stats: [
      ['Total properties', '6', '+12.4%', Building2],
      ['Active tenants', '2', '+8.1%', Users],
      ['Monthly revenue', '60,000 tk', '+14.2%', CircleDollarSign],
      ['Open tickets', '18', '-5.6%', Wrench],
    ] as [string, string, string, Icon][],
  },
  Landlord: {
    eyebrow: 'Good morning, Usman Dalal',
    title: 'Your properties are thriving.',
    subtitle: '',
    stats: [
      ['My properties', '24', '+2 this month', Building2],
      ['Occupancy rate', '94%', '+3.2%', Users],
      ['Rent collected', '$48.2K', '+10.8%', CircleDollarSign],
      ['Open tickets', '7', '2 urgent', Wrench],
    ] as [string, string, string, Icon][],
  },
  Tenant: {
    eyebrow: 'Welcome home, Emon',
    title: 'Your home, Lets check out.',
    subtitle: 'Your next rent payment is due in 8 days.',
    stats: [
      ['Next payment', '$2,450', 'Due May 01', CircleDollarSign],
      ['Lease remaining', '8 mo', 'Until Jan 2026', CalendarDays],
      ['Open requests', '1', 'In progress', Wrench],
      ['Saved homes', '12', '3 new matches', House],
    ] as [string, string, string, Icon][],
  },
}

export const activities = [
  { icon: CircleDollarSign, title: 'Rent payment received', detail: 'Emon Ahmed Likhon · Lakeview Residence', time: '12 min ago', tone: 'blue' },
  { icon: FileText, title: 'New rental application', detail: 'Usman Dalal · The Rowan, 4B', time: '48 min ago', tone: 'violet' },
  { icon: Wrench, title: 'Maintenance request updated', detail: 'Solimullah Khan (Bideshi Party) · Lumen House, 8A', time: '2 hr ago', tone: 'orange' },
  { icon: FileCheck2, title: 'Lease agreement signed', detail: 'Mizanur Shudkhor · Atelier No. 7', time: 'Yesterday', tone: 'green' },
]

export const records: Record<string, { title: string; subtitle: string; action: string; rows: string[][] }> = {
  People: {
    title: 'People & access',
    subtitle: 'Manage every landlord and tenant in your Application.',
    action: 'Invite user',
    rows: [
      ['Emon Ahmed Likhon', 'Tenant', 'Lakeview Residence', 'Active'],
      ['Usman Dalal', 'Landlord', '8 properties', 'Active'],
      ['Solimullah Khan (Bideshi party)', 'Applicant', 'The Rowan', 'Pending'],
      ['Mizanur Shudkhor', 'Tenant', 'Atelier No. 7', 'Active'],
    ],
  },
  Applications: {
    title: 'Rental applications',
    subtitle: 'Review applicants and move approved renters into a lease.',
    action: 'New application',
    rows: [
      ['Golam Rabby', 'The Rowan · 4B', 'Apr 22, 2025', 'Review'],
      ['Sheham', 'Lumen House · 3C', 'Apr 21, 2025', 'Approved'],
      ['Imtiaz Uddin Alomgir (Jersey bebshahi)', 'Harbor View · 12A', 'Apr 19, 2025', 'Pending'],
      ['Al-Amin (Italy probashi)', 'The Rowan · 8F', 'Apr 18, 2025', 'Approved'],
    ],
  },
  Leases: {
    title: 'Lease management',
    subtitle: 'Track agreements, renewals, rent terms and occupancy.',
    action: 'Create lease',
    rows: [
      ['Olivia Martin', 'Harbor View · 12A', 'Jan 2025 — Jan 2026', 'Active'],
      ['Sophia Turner', 'Atelier No. 7 · 5D', 'Mar 2025 — Mar 2026', 'Active'],
      ['Noah Adams', 'Lumen House · 8A', 'Jun 2024 — Jun 2025', 'Renewal'],
      ['Emma Stone', 'Park Place · 14C', 'May 2024 — May 2025', 'Ending'],
    ],
  },
  Payments: {
    title: 'Payments & receipts',
    subtitle: 'Monitor rent collection, receipts and overdue balances.',
    action: 'Record payment',
    rows: [
      ['65,000tk', 'Emon Ahmed Likhon', 'Apr 24, 2025', 'Paid'],
      ['48,000tk', 'Skyline heights', 'Apr 22, 2025', 'Paid'],
      ['36,000tk', 'Amber House', 'Due Apr 20', 'Late'],
      ['60,000tk', 'Urban shotodol', 'May 01, 2025', 'Scheduled'],
    ],
  },
  Maintenance: {
    title: 'Maintenance tickets',
    subtitle: 'Resolve repairs quickly and keep residents informed.',
    action: 'New ticket',
    rows: [
      ['Kitchen faucet leak', 'Lumen House · 8A', 'Plumbing', 'In progress'],
      ['HVAC not cooling', 'Harbor View · 12A', 'Urgent', 'Open'],
      ['Hallway light', 'The Rowan · 4B', 'Electrical', 'Resolved'],
      ['Dishwasher noise', 'Park Place · 14C', 'Appliance', 'Open'],
    ],
  },
}

export const DEFAULT_COVER =
  'https://images.pexels.com/photos/13308024/pexels-photo-13308024.jpeg?cs=tinysrgb&dpr=1&w=500'
