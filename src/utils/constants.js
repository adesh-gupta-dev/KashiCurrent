import {
  CalendarDays,
  ClipboardCheck,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';

export const ROLES = {
  HOMEOWNER: 'HOMEOWNER',
  ELECTRICIAN: 'ELECTRICIAN',
  ADMIN: 'ADMIN',
};

export const APPOINTMENT_STATUS = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const COMPLAINT_STATUS = {
  OPEN: 'OPEN',
  IN_REVIEW: 'IN_REVIEW',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
};

export const AVAILABILITY_DAYS = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

export const services = [
  {
    title: 'Smart Home Wiring',
    description: 'Connected lighting, automation hubs, sensor routing, and fault-safe installation.',
    icon: Zap,
  },
  {
    title: 'Panel Upgrades',
    description: 'Safer power distribution, capacity planning, surge protection, and clean documentation.',
    icon: ShieldCheck,
  },
  {
    title: 'Emergency Repairs',
    description: 'Rapid-response troubleshooting for outages, unsafe circuits, and urgent restoration work.',
    icon: Wrench,
  },
  {
    title: 'Preventive Maintenance',
    description: 'Routine inspections, thermal checks, performance reviews, and code compliance support.',
    icon: ClipboardCheck,
  },
];

export const landingHighlights = [
  {
    title: 'Verified Experts',
    value: '480+',
    description: 'Professionals vetted for licensing, skill, and trust.',
  },
  {
    title: 'Completed Jobs',
    value: '15k+',
    description: 'Service visits delivered with premium homeowner support.',
  },
  {
    title: 'Average Rating',
    value: '4.9/5',
    description: 'Consistently strong quality across installations and repairs.',
  },
  {
    title: 'Emergency Coverage',
    value: '24/7',
    description: 'High-priority support when your home needs attention fast.',
  },
];

export const featuredMetrics = [
  {
    title: 'Fast booking',
    body: 'Pick a verified electrician, confirm your slot, and track status from one dashboard.',
    icon: CalendarDays,
  },
  {
    title: 'Premium experience',
    body: 'Every screen is tuned for homeowner confidence and electrician productivity.',
    icon: Sparkles,
  },
];
