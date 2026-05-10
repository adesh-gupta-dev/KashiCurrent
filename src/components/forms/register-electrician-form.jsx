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
import { Textarea } from '@/components/ui/textarea';
import { showErrorToast } from '@/lib/error-toast';
import { authService } from '@/services/auth.service';

const phoneRegex = /^\+?[0-9]{10,15}$/;
const strongPasswordMessage = 'Password must include uppercase, lowercase, number, and symbol.';

const schema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Enter a valid email address.'),
  phoneNumber: z.string().regex(phoneRegex, 'Phone number must be 10 to 15 digits and may start with +.'),
  experienceYears: z.coerce.number().min(0).max(60),
  serviceArea: z.string().optional().or(z.literal('')),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  skills: z.string().min(2, 'Add at least one skill.'),
  profileImage: z.string().url('Use a valid image URL.').optional().or(z.literal('')),
  bio: z.string().max(500).optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, strongPasswordMessage)
    .regex(/[a-z]/, strongPasswordMessage)
    .regex(/[0-9]/, strongPasswordMessage)
    .regex(/[^A-Za-z0-9]/, strongPasswordMessage),
});

export function RegisterElectricianForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      experienceYears: 5,
      serviceArea: '',
      latitude: '',
      longitude: '',
      skills: '',
      profileImage: '',
      bio: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    try {
      await authService.registerElectrician({
        ...values,
        skills: values.skills.split(',').map((item) => item.trim()).filter(Boolean),
        latitude: values.latitude ? Number(values.latitude) : undefined,
        longitude: values.longitude ? Number(values.longitude) : undefined,
        profileImage: values.profileImage || undefined,
      });
      toast.success('Electrician profile created. You can now sign in.');
      router.push('/login');
    } catch (error) {
      showErrorToast(error, 'Unable to create electrician account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle className="font-display text-3xl">Join as an Electrician</CardTitle>
        <CardDescription>
          Build your premium service profile and manage bookings from one operational dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="electrician-name">Full name</Label>
            <Input id="electrician-name" className="mt-2" {...form.register('fullName')} />
            {form.formState.errors.fullName ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.fullName.message}</p>
            ) : null}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="electrician-email">Email</Label>
              <Input id="electrician-email" type="email" className="mt-2" {...form.register('email')} />
              {form.formState.errors.email ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.email.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="electrician-phone">Phone number</Label>
              <Input id="electrician-phone" className="mt-2" {...form.register('phoneNumber')} />
              {form.formState.errors.phoneNumber ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.phoneNumber.message}</p>
              ) : null}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="electrician-experience">Experience years</Label>
              <Input id="electrician-experience" type="number" className="mt-2" {...form.register('experienceYears')} />
              {form.formState.errors.experienceYears ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.experienceYears.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="electrician-service-area">Service area</Label>
              <Input id="electrician-service-area" className="mt-2" {...form.register('serviceArea')} />
              <div className="mt-3 space-y-3">
                <GeocodeLocationButton
                  location={form.watch('serviceArea')}
                  buttonLabel="Get latitude & longitude"
                  onResolved={({ formattedAddress, latitude, longitude }) => {
                    form.setValue('serviceArea', formattedAddress, { shouldValidate: true });
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
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="electrician-latitude">Latitude</Label>
              <Input id="electrician-latitude" className="mt-2" {...form.register('latitude')} />
              {form.formState.errors.latitude ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.latitude.message}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="electrician-longitude">Longitude</Label>
              <Input id="electrician-longitude" className="mt-2" {...form.register('longitude')} />
              {form.formState.errors.longitude ? (
                <p className="mt-2 text-sm text-danger">{form.formState.errors.longitude.message}</p>
              ) : null}
            </div>
          </div>
          <div>
            <Label htmlFor="electrician-skills">Skills</Label>
            <Input
              id="electrician-skills"
              className="mt-2"
              placeholder="EV Chargers, Rewiring, Smart Home"
              {...form.register('skills')}
            />
            {form.formState.errors.skills ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.skills.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="electrician-profile-image">Profile image URL</Label>
            <Input id="electrician-profile-image" className="mt-2" {...form.register('profileImage')} />
            {form.formState.errors.profileImage ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.profileImage.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="electrician-bio">Professional bio</Label>
            <Textarea id="electrician-bio" className="mt-2" {...form.register('bio')} />
            {form.formState.errors.bio ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.bio.message}</p>
            ) : null}
          </div>
          <div>
            <Label htmlFor="electrician-password">Password</Label>
            <div className="relative mt-2">
              <Input
                id="electrician-password"
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
            {loading ? 'Creating profile...' : 'Create Electrician Account'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Need a homeowner account instead?{' '}
            <Link href="/register/homeowner" className="font-semibold text-primary">
              Register here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
