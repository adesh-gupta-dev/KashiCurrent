'use client';

import { create } from 'zustand';

export const useNotificationStore = create((set) => ({
  items: [],
  unreadCount: 0,
  setNotifications: (items) =>
    set({
      items,
      unreadCount: items.filter((item) => !item.isRead).length,
    }),
  markAsRead: (id) =>
    set((state) => {
      const items = state.items.map((item) =>
        item.id === id ? { ...item, isRead: true } : item
      );

      return {
        items,
        unreadCount: items.filter((item) => !item.isRead).length,
      };
    }),
}));
