import { toast } from 'sonner';

function normalizeDetailMessages(details) {
  if (!details) {
    return [];
  }

  if (Array.isArray(details)) {
    return details
      .map((detail) => detail?.msg || detail?.message || String(detail || '').trim())
      .filter(Boolean);
  }

  if (typeof details === 'object') {
    return Object.values(details)
      .flat()
      .map((detail) => {
        if (typeof detail === 'string') {
          return detail;
        }

        return detail?.msg || detail?.message || '';
      })
      .filter(Boolean);
  }

  return [String(details)];
}

export function getErrorToastConfig(error, fallbackTitle = 'Something went wrong') {
  const status = error?.status;
  const detailMessages = [...new Set(normalizeDetailMessages(error?.details))];
  const rawMessage = error?.message || '';

  if (status === 422 && detailMessages.length) {
    return {
      title: 'Please check the form and try again',
      description: detailMessages.slice(0, 3).join(' '),
    };
  }

  if (status === 401) {
    return {
      title: 'You are not authorized for this action',
      description: rawMessage || 'Please sign in again and retry.',
    };
  }

  if (status === 403) {
    return {
      title: 'Access denied',
      description: rawMessage || 'Your account cannot perform this action right now.',
    };
  }

  if (status === 404) {
    return {
      title: 'Requested resource not found',
      description: rawMessage || 'The requested record could not be found.',
    };
  }

  if (!navigator.onLine) {
    return {
      title: 'You appear to be offline',
      description: 'Check your internet connection and try again.',
    };
  }

  if (detailMessages.length) {
    return {
      title: rawMessage || fallbackTitle,
      description: detailMessages.slice(0, 3).join(' '),
    };
  }

  return {
    title: rawMessage || fallbackTitle,
    description: status ? `Request failed with status ${status}.` : undefined,
  };
}

export function showErrorToast(error, fallbackTitle) {
  const { title, description } = getErrorToastConfig(error, fallbackTitle);
  toast.error(title, description ? { description } : undefined);
}
