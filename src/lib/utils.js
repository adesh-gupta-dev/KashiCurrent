import { clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function formatCurrency(value, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function formatDate(value, pattern = 'dd MMM yyyy') {
  if (!value) {
    return 'TBD';
  }

  return format(new Date(value), pattern);
}

export function formatDateTime(value) {
  if (!value) {
    return 'TBD';
  }

  return format(new Date(value), 'dd MMM yyyy, hh:mm a');
}

export function toTitleCase(value = '') {
  return value
    .toLowerCase()
    .split('_')
    .join(' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function parseCookie(cookieString = '') {
  return cookieString.split(';').reduce((accumulator, item) => {
    const [rawKey, ...rawValue] = item.trim().split('=');

    if (!rawKey) {
      return accumulator;
    }

    accumulator[rawKey] = decodeURIComponent(rawValue.join('='));
    return accumulator;
  }, {});
}
