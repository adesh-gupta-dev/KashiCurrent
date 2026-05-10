'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showErrorToast } from '@/lib/error-toast';
import { homeownerService } from '@/services/homeowner.service';

const schema = z.object({
  electricianId: z.string().uuid('Select an electrician to continue.'),
  appointmentDate: z.string().min(1, 'Date is required.'),
  appointmentTime: z.string().min(1, 'Time is required.'),
  serviceType: z.string().min(2, 'Service type is required.'),
  issueDescription: z.string().min(10, 'Describe the issue in a bit more detail.'),
  appointmentAddress: z.string().min(5, 'Address is required.'),
});

export function AppointmentForm({ selectedElectrician, address, onBooked }) {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      electricianId: '',
      appointmentDate: '',
      appointmentTime: '',
      serviceType: '',
      issueDescription: '',
      appointmentAddress: address || '',
    },
  });

  useEffect(() => {
    if (selectedElectrician?.id) {
      form.setValue('electricianId', selectedElectrician.id);
    }
  }, [selectedElectrician, form]);

  useEffect(() => {
    if (address) {
      form.setValue('appointmentAddress', address);
    }
  }, [address, form]);

  async function onSubmit(values) {
    setSubmitting(true);

    try {
      await homeownerService.createAppointment(values);
      toast.success('Appointment booked successfully.');
      form.reset({
        electricianId: selectedElectrician?.id || '',
        appointmentDate: '',
        appointmentTime: '',
        serviceType: '',
        issueDescription: '',
        appointmentAddress: address || '',
      });
      onBooked?.();
    } catch (error) {
      showErrorToast(error, 'Unable to book appointment');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle>Book a service visit</CardTitle>
        <CardDescription>
          {selectedElectrician
            ? `Booking with ${selectedElectrician.fullName}`
            : 'Select an electrician card to prefill the booking form.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <input type="hidden" {...form.register('electricianId')} />
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="appointment-date">Appointment date</Label>
              <Input id="appointment-date" type="date" className="mt-2" {...form.register('appointmentDate')} />
              {form.formState.errors.appointmentDate ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.appointmentDate.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="appointment-time">Appointment time</Label>
              <Input id="appointment-time" type="time" className="mt-2" {...form.register('appointmentTime')} />
              {form.formState.errors.appointmentTime ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.appointmentTime.message}</p>
              ) : null}
            </div>
          </div>
          <div>
            <Label htmlFor="appointment-service">Service type</Label>
            <Input id="appointment-service" className="mt-2" {...form.register('serviceType')} />
            {form.formState.errors.serviceType ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.serviceType.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="appointment-description">Issue description</Label>
            <Textarea id="appointment-description" className="mt-2" {...form.register('issueDescription')} />
            {form.formState.errors.issueDescription ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.issueDescription.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="appointment-address">Appointment address</Label>
            <Input id="appointment-address" className="mt-2" {...form.register('appointmentAddress')} />
            {form.formState.errors.appointmentAddress ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.appointmentAddress.message}</p>
            ) : null}
            {form.formState.errors.electricianId ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.electricianId.message}</p>
            ) : null}
          </div>
          <Button className="w-full" size="lg" disabled={submitting || !selectedElectrician}>
            {submitting ? 'Booking appointment...' : 'Confirm booking'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
