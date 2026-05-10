'use client';

import { apiClient, unwrapRequest } from '@/lib/api-client';

export const authService = {
  registerHomeowner(payload) {
    return unwrapRequest(apiClient.post('/auth/homeowners/register', payload));
  },
  registerElectrician(payload) {
    return unwrapRequest(apiClient.post('/auth/electricians/register', payload));
  },
  login(payload) {
    return unwrapRequest(apiClient.post('/auth/login', payload));
  },
  forgotPassword(payload) {
    return unwrapRequest(apiClient.post('/auth/forgot-password', payload));
  },
  resetPassword(payload) {
    return unwrapRequest(apiClient.post('/auth/reset-password', payload));
  },
  verifyEmail(token) {
    return unwrapRequest(apiClient.get(`/auth/verify-email?token=${encodeURIComponent(token)}`));
  },
  getCurrentUser() {
    return unwrapRequest(apiClient.get('/auth/me'));
  },
  logout() {
    return unwrapRequest(apiClient.post('/auth/logout'));
  },
};
