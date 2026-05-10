'use client';

import { apiClient, unwrapRequest } from '@/lib/api-client';

export const adminService = {
  getAnalytics() {
    return unwrapRequest(apiClient.get('/admin/analytics'));
  },
  getUsers() {
    return unwrapRequest(apiClient.get('/admin/users'));
  },
  updateUserBlockStatus(id, isBlocked) {
    return unwrapRequest(apiClient.patch(`/admin/users/${id}/block`, { isBlocked }));
  },
  getElectricians() {
    return unwrapRequest(apiClient.get('/admin/electricians'));
  },
  updateElectricianBlockStatus(id, isBlocked) {
    return unwrapRequest(apiClient.patch(`/admin/electricians/${id}/block`, { isBlocked }));
  },
  updateElectricianVerification(id, isVerified) {
    return unwrapRequest(apiClient.patch(`/admin/electricians/${id}/verify`, { isVerified }));
  },
  getAppointments() {
    return unwrapRequest(apiClient.get('/admin/appointments'));
  },
  getComplaints() {
    return unwrapRequest(apiClient.get('/admin/complaints'));
  },
  updateComplaintStatus(id, status) {
    return unwrapRequest(apiClient.patch(`/admin/complaints/${id}/status`, { status }));
  },
};
