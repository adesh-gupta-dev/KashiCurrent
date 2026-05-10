'use client';

import { apiClient, unwrapRequest } from '@/lib/api-client';

export const homeownerService = {
  getProfile() {
    return unwrapRequest(apiClient.get('/users/profile'));
  },
  updateProfile(payload) {
    return unwrapRequest(apiClient.put('/users/profile', payload));
  },
  searchElectricians(params) {
    return unwrapRequest(apiClient.get('/users/electricians/search', { params }));
  },
  createAppointment(payload) {
    return unwrapRequest(apiClient.post('/appointments', payload));
  },
  getAppointments(status) {
    return unwrapRequest(apiClient.get('/appointments/my', { params: status ? { status } : {} }));
  },
  rescheduleAppointment(id, payload) {
    return unwrapRequest(apiClient.patch(`/appointments/${id}/reschedule`, payload));
  },
  cancelAppointment(id) {
    return unwrapRequest(apiClient.patch(`/appointments/${id}/cancel`));
  },
};
