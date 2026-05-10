'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { GeocodeLocationButton } from '@/components/common/geocode-location-button';
import { CurrentLocationButton } from '@/components/common/current-location-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showErrorToast } from '@/lib/error-toast';
import { authService } from '@/services/auth.service';

const phoneRegex = /^\+?[0-9]{10,15}$/;
const strongPasswordMessage = 'Password must include uppercase, lowercase, number, and symbol.';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Enter a valid email address.'),
  phoneNumber: z.string().regex(phoneRegex, 'Phone number must be 10 to 15 digits and may start with +.'),
  address: z.string().optional().or(z.literal('')),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, strongPasswordMessage)
    .regex(/[a-z]/, strongPasswordMessage)
    .regex(/[0-9]/, strongPasswordMessage)
    .regex(/[^A-Za-z0-9]/, strongPasswordMessage),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

export function RegisterHomeownerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      password: '',
      latitude: '',
      longitude: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    try {
      await authService.registerHomeowner({
        ...values,
        latitude: values.latitude ? Number(values.latitude) : undefined,
        longitude: values.longitude ? Number(values.longitude) : undefined,
      });
      toast.success('Account created. Check your email for verification if needed.');
      router.push('/login');
    } catch (error) {
      showErrorToast(error, 'Unable to create homeowner account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle className="font-display text-3xl">Create Homeowner Account</CardTitle>
        <CardDescription>
          Secure your home with verified electricians and modern booking control.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="homeowner-name">Full name</Label>
            <Input id="homeowner-name" className="mt-2" {...form.register('fullName')} />
            {form.formState.errors.fullName ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.fullName.message}</p>
            ) : null}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="homeowner-email">Email</Label>
              <Input id="homeowner-email" type="email" className="mt-2" {...form.register('email')} />
              {form.formState.errors.email ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.email.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="homeowner-phone">Phone number</Label>
              <Input id="homeowner-phone" className="mt-2" {...form.register('phoneNumber')} />
              {form.formState.errors.phoneNumber ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.phoneNumber.message}</p>
              ) : null}
            </div>
          </div>
          <div>
            <Label htmlFor="homeowner-address">Address</Label>
            <Input id="homeowner-address" className="mt-2" {...form.register('address')} />
            <div className="mt-3 space-y-3">
              <GeocodeLocationButton
                location={form.watch('address')}
                buttonLabel="Get latitude & longitude"
                onResolved={({ formattedAddress, latitude, longitude }) => {
                  form.setValue('address', formattedAddress, { shouldValidate: true });
                  form.setValue('latitude', latitude, { shouldValidate: true });
                  form.setValue('longitude', longitude, { shouldValidate: true });
                }}
              />
              <CurrentLocationButton
                onResolved={({ latitude, longitude }) => {
                  form.setValue('latitude', latitude, { shouldValidate: true });
                  form.setValue('longitude', longitude, { shouldValidate: true });
                }}
              />
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="homeowner-latitude">Latitude</Label>
              <Input id="homeowner-latitude" className="mt-2" {...form.register('latitude')} />
              {form.formState.errors.latitude ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.latitude.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="homeowner-longitude">Longitude</Label>
              <Input id="homeowner-longitude" className="mt-2" {...form.register('longitude')} />
              {form.formState.errors.longitude ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.longitude.message}</p>
              ) : null}
            </div>
          </div>
          <div>
            <Label htmlFor="homeowner-password">Password</Label>
            <div className="relative mt-2">
              <Input
                id="homeowner-password"
                type={showPassword ? 'text' : 'password'}
                className="pr-12"
                {...form.register('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword((state) => !state)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.password ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.password.message}</p>
            ) : null}
          </div>
          <Button className="w-full" size="lg" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Homeowner Account'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Looking to offer services instead?{' '}
            <Link href="/register/electrician" className="font-semibold text-primary">
              Join as an electrician
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
