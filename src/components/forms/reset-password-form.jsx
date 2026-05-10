'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

const schema = z.object({
  email: z.string().email('Enter a valid email address.'),
  otp: z.string().length(6, 'OTP must be 6 digits.'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(/[A-Z]/, 'Password needs one uppercase letter.')
    .regex(/[a-z]/, 'Password needs one lowercase letter.')
    .regex(/[0-9]/, 'Password needs one number.')
    .regex(/[^A-Za-z0-9]/, 'Password needs one symbol.'),
});

function OtpInput({ value, onChange }) {
  const values = value.padEnd(6, ' ').split('');

  return (
    <div className="grid grid-cols-6 gap-2">
      {values.map((digit, index) => (
        <Input
          key={index}
          inputMode="numeric"
          maxLength={1}
          value={digit.trim()}
          className="h-12 text-center text-lg"
          onChange={(event) => {
            const next = event.target.value.replace(/\D/g, '').slice(-1);
            const chars = value.padEnd(6, ' ').split('');
            chars[index] = next || ' ';
            onChange(chars.join('').trim());
          }}
        />
      ))}
    </div>
  );
}

export function ResetPasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      otp: '',
      newPassword: '',
    },
  });

  async function onSubmit(values) {
    setLoading(true);

    try {
      await authService.resetPassword(values);
      toast.success('Password reset successfully.');
      router.push('/login');
    } catch (error) {
      showErrorToast(error, 'Unable to reset password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="glass-panel border-white/40">
      <CardHeader>
        <CardTitle className="font-display text-3xl">Enter OTP and New Password</CardTitle>
        <CardDescription>
          Complete your recovery flow with the code we emailed you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="reset-email">Email address</Label>
            <Input id="reset-email" className="mt-2" {...form.register('email')} />
          </div>

          <div>
            <Label>OTP code</Label>
            <div className="mt-2">
              <OtpInput
                value={form.watch('otp')}
                onChange={(value) => form.setValue('otp', value, { shouldValidate: true })}
              />
            </div>
            {form.formState.errors.otp ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.otp.message}</p>
            ) : null}
          </div>

          <div>
            <Label htmlFor="reset-password">New password</Label>
            <div className="relative mt-2">
              <Input
                id="reset-password"
                type={showPassword ? 'text' : 'password'}
                className="pr-12"
                {...form.register('newPassword')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword((state) => !state)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.newPassword ? (
              <p className="mt-2 text-sm text-danger">{form.formState.errors.newPassword.message}</p>
            ) : null}
          </div>

          <Button className="w-full" size="lg" disabled={loading}>
            {loading ? 'Updating password...' : 'Reset password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
