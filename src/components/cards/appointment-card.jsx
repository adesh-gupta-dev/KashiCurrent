'use client';

import { useState } from 'react';
import { CalendarDays, Clock3, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getStatusTone } from '@/utils/formatters';
import { formatDate, toTitleCase } from '@/lib/utils';
import { APPOINTMENT_STATUS, ROLES } from '@/utils/constants';

export function AppointmentCard({ appointment, role, onStatusChange, onCancel, onReschedule }) {
  const [editing, setEditing] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const counterpart =
    role === ROLES.ELECTRICIAN ? appointment.user : appointment.electrician;

  async function submitReschedule() {
    if (!appointmentDate || !appointmentTime) {
      return;
    }

    await onReschedule?.(appointment.id, {
      appointmentDate,
      appointmentTime,
    });
    setEditing(false);
  }

  return (
    <Card className="border-border/70 bg-card/90">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{appointment.serviceType}</h3>
              <Badge tone={getStatusTone(appointment.status)}>
                {toTitleCase(appointment.status)}
              </Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {counterpart?.fullName || 'Assigned contact'}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              {appointment.issueDescription}
            </p>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {formatDate(appointment.appointmentDate)}
            </p>
            <p className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {appointment.appointmentTime}
            </p>
            <p className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {appointment.appointmentAddress}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {role === ROLES.HOMEOWNER &&
          ![APPOINTMENT_STATUS.CANCELLED, APPOINTMENT_STATUS.COMPLETED].includes(appointment.status) ? (
            <>
              <Button variant="outline" onClick={() => setEditing((state) => !state)}>
                Reschedule
              </Button>
              <Button variant="danger" onClick={() => onCancel?.(appointment.id)}>
                Cancel
              </Button>
            </>
          ) : null}

          {role === ROLES.ELECTRICIAN && appointment.status === APPOINTMENT_STATUS.PENDING ? (
            <>
              <Button onClick={() => onStatusChange?.(appointment.id, APPOINTMENT_STATUS.ACCEPTED)}>
                Accept
              </Button>
              <Button
                variant="outline"
                onClick={() => onStatusChange?.(appointment.id, APPOINTMENT_STATUS.REJECTED)}
              >
                Reject
              </Button>
            </>
          ) : null}

          {role === ROLES.ELECTRICIAN && appointment.status === APPOINTMENT_STATUS.ACCEPTED ? (
            <Button onClick={() => onStatusChange?.(appointment.id, APPOINTMENT_STATUS.COMPLETED)}>
              Mark Complete
            </Button>
          ) : null}
        </div>

        {editing ? (
          <div className="mt-5 grid gap-4 rounded-2xl border border-border bg-background/80 p-4 md:grid-cols-2">
            <div>
              <Label htmlFor={`reschedule-date-${appointment.id}`}>New date</Label>
              <Input
                id={`reschedule-date-${appointment.id}`}
                type="date"
                value={appointmentDate}
                onChange={(event) => setAppointmentDate(event.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor={`reschedule-time-${appointment.id}`}>New time</Label>
              <Input
                id={`reschedule-time-${appointment.id}`}
                type="time"
                value={appointmentTime}
                onChange={(event) => setAppointmentTime(event.target.value)}
                className="mt-2"
              />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <Button onClick={submitReschedule}>Save changes</Button>
              <Button variant="outline" onClick={() => setEditing(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
