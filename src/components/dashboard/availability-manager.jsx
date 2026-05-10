'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/common/empty-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { showErrorToast } from '@/lib/error-toast';
import { electricianService } from '@/services/electrician.service';
import { AVAILABILITY_DAYS } from '@/utils/constants';

export function AvailabilityManager({ slots, onRefresh }) {
  const [day, setDay] = useState('MONDAY');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const invalidRange = startTime >= endTime;

  async function handleCreate() {
    if (invalidRange) {
      toast.error('Start time must be earlier than end time.');
      return;
    }

    try {
      await electricianService.createAvailability({
        daysOfWeek: [day],
        startTime,
        endTime,
      });
      toast.success('Availability slot created.');
      onRefresh?.();
    } catch (error) {
      showErrorToast(error, 'Unable to create availability slot');
    }
  }

  async function toggleSlot(slot) {
    try {
      await electricianService.updateAvailability(slot.id, { isActive: !slot.isActive });
      toast.success('Availability updated.');
      onRefresh?.();
    } catch (error) {
      showErrorToast(error, 'Unable to update availability');
    }
  }

  async function deleteSlot(id) {
    try {
      await electricianService.deleteAvailability(id);
      toast.success('Availability removed.');
      onRefresh?.();
    } catch (error) {
      showErrorToast(error, 'Unable to remove availability');
    }
  }

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle>Availability management</CardTitle>
        <CardDescription>
          Create weekly slots, pause them when needed, and keep your schedule accurate.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <Label>Day</Label>
            <Select className="mt-2" value={day} onChange={(event) => setDay(event.target.value)}>
              {AVAILABILITY_DAYS.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Start time</Label>
            <Input className="mt-2" type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} />
          </div>
          <div>
            <Label>End time</Label>
            <Input className="mt-2" type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} />
          </div>
          <div className="flex items-end">
            <Button className="w-full" onClick={handleCreate} disabled={invalidRange}>
              Add slot
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {slots.length ? (
            slots.map((slot) => (
              <div key={slot.id} className="flex flex-col gap-3 rounded-2xl border border-border p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold">{slot.dayOfWeek}</p>
                  <p className="text-sm text-muted-foreground">
                    {slot.startTime} to {slot.endTime} | {slot.timezone}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => toggleSlot(slot)}>
                    {slot.isActive ? 'Disable' : 'Enable'}
                  </Button>
                  <Button variant="danger" onClick={() => deleteSlot(slot.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <EmptyState
              title="No availability yet"
              description="Add at least one weekly slot so homeowners can book you during live searches."
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
