'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showErrorToast } from '@/lib/error-toast';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth-store';

const schema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

const roleRoutes = {
  HOMEOWNER: '/dashboard/homeowner',
  ELECTRICIAN: '/dashboard/electrician',
  ADMIN: '/dashboard/admin',
};

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    try {
      const response = await authService.login(values);
      const { token, role, user } = response;
      setSession({ token, role, user });
      toast.success('Login successful.');

      const nextPath = searchParams.get('next');
      router.replace(nextPath || roleRoutes[role] || '/');
      router.refresh();
    } catch (error) {
      showErrorToast(error, 'Unable to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="glass-panel border-white/40">
      <CardHeader className="space-y-3">
        <CardTitle className="font-display text-3xl">Secure Sign In</CardTitle>
        <CardDescription>
          Homeowners, electricians, and administrators all use the same protected login flow.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="login-email">Email address</Label>
            <Input id="login-email" className="mt-2" {...form.register('email')} />
            {form.formState.errors.email ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="login-password">Password</Label>
              <Link href="/forgot-password" className="text-sm font-medium text-primary">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-2">
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                className="pr-12"
                {...form.register('password')}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
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
            {loading ? 'Signing in...' : 'Sign in to account'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            New to KashiCurrent?{' '}
            <Link href="/register" className="font-semibold text-primary">
              Create an account
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
