'use client';

import { apiClient, unwrapRequest } from '@/lib/api-client';

export const electricianService = {
  getProfile() {
    return unwrapRequest(apiClient.get('/electricians/profile'));
  },
  updateProfile(payload) {
    return unwrapRequest(apiClient.put('/electricians/profile', payload));
  },
  getAppointments(status) {
    return unwrapRequest(apiClient.get('/appointments/my', { params: status ? { status } : {} }));
  },
  updateAppointmentStatus(id, status) {
    return unwrapRequest(apiClient.patch(`/appointments/${id}/status`, { status }));
  },
  getReviews() {
    return unwrapRequest(apiClient.get('/electricians/reviews'));
  },
  getAvailability() {
    return unwrapRequest(apiClient.get('/availability/my-slots'));
  },
  createAvailability(payload) {
    return unwrapRequest(apiClient.post('/availability', payload));
  },
  updateAvailability(id, payload) {
    return unwrapRequest(apiClient.put(`/availability/${id}`, payload));
  },
  deleteAvailability(id) {
    return unwrapRequest(apiClient.delete(`/availability/${id}`));
  },
};
