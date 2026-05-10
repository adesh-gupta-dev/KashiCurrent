'use client';

import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { showErrorToast } from '@/lib/error-toast';
import { notificationService } from '@/services/notification.service';
import { useNotificationStore } from '@/store/notification-store';
import { formatDateTime } from '@/lib/utils';

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { items, unreadCount, setNotifications, markAsRead } = useNotificationStore();

  useEffect(() => {
    notificationService
      .getNotifications()
      .then((response) => setNotifications(response))
      .catch(() => null);
  }, [setNotifications]);

  async function handleRead(id) {
    try {
      await notificationService.markAsRead(id);
      markAsRead(id);
    } catch (error) {
      showErrorToast(error, 'Unable to mark notification as read');
    }
  }

  return (
    <div className="relative">
      <Button variant="outline" size="icon" onClick={() => setOpen((state) => !state)}>
        <Bell className="h-4 w-4" />
        {unreadCount ? (
          <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        ) : null}
      </Button>

      {open ? (
        <Card className="absolute right-0 z-40 mt-3 w-[22rem]">
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {unreadCount} unread
              </span>
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto">
              {items.length ? (
                items.map((item) => (
                  <button
                    key={item.id}
                    className="w-full rounded-2xl border border-border p-3 text-left hover:bg-muted/40"
                    onClick={() => handleRead(item.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
                      </div>
                      {!item.isRead ? <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" /> : null}
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {formatDateTime(item.createdAt)}
                    </p>
                  </button>
                ))
              ) : (
                <p className="rounded-2xl bg-muted p-4 text-sm text-muted-foreground">
                  You are all caught up.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
