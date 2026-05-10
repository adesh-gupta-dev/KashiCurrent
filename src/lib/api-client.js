'use client';

import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export class ApiClientError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'ApiClientError';
    this.status = options.status || 500;
    this.details = options.details || null;
    this.raw = options.raw || null;
  }
};

function getStoredToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem('kc_access_token');
}

function normalizeError(error) {
  const payload = error?.response?.data;
  const message =
    payload?.message ||
    payload?.details?.message ||
    error?.message ||
    'Something went wrong while contacting the server.';

  return new ApiClientError(message, {
    status: error?.response?.status,
    details: payload?.details || payload?.errors || null,
    raw: payload || error,
  });
};

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error?.response?.status === 401) {
      window.dispatchEvent(new CustomEvent('kc:unauthorized'));
    }

    return Promise.reject(normalizeError(error));
  }
);

export async function unwrapRequest(request) {
  try {
    const response = await request;
    return response.data?.data ?? response.data;
  } catch (error) {
    throw normalizeError(error);
  }
}
