'use client';

import { apiClient, unwrapRequest } from '@/lib/api-client';

export const notificationService = {
  getNotifications() {
    return unwrapRequest(apiClient.get('/notifications'));
  },
  markAsRead(id) {
    return unwrapRequest(apiClient.patch(`/notifications/${id}/read`));
  },
};
