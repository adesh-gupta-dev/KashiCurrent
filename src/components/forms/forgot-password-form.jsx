'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showErrorToast } from '@/lib/error-toast';
import { authService } from '@/services/auth.service';

const schema = z.object({
  email: z.string().email('Enter a valid email address.'),
});

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    try {
      const response = await authService.forgotPassword(values);
      toast.success(response.message || 'If the account exists, an OTP has been sent.');
    } catch (error) {
      showErrorToast(error, 'Unable to send OTP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="glass-panel border-white/40">
      <CardHeader>
        <CardTitle className="font-display text-3xl">Reset Your Password</CardTitle>
        <CardDescription>
          We will send a six-digit OTP if an account matches your email.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="forgot-email">Email address</Label>
            <Input id="forgot-email" className="mt-2" {...form.register('email')} />
            {form.formState.errors.email ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.email.message}</p>
            ) : null}
          </div>
          <Button className="w-full" size="lg" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have the code?{' '}
            <Link href="/reset-password" className="font-semibold text-primary">
              Reset password
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
