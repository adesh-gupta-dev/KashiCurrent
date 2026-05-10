'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, LoaderCircle, ShieldAlert } from 'lucide-react';
import { authService } from '@/services/auth.service';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';

export function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Verification token missing from the link.');
      return;
    }

    authService
      .verifyEmail(token)
      .then((response) => {
        setStatus('success');
        setMessage(response.message || 'Email verified successfully.');
      })
      .catch((error) => {
        setStatus('error');
        setMessage(error.message);
      });
  }, [searchParams]);

  return (
    <Card className="mx-auto max-w-xl border-border/70 bg-card/90 shadow-soft">
      <CardContent className="flex flex-col items-center px-6 py-12 text-center">
        {status === 'loading' ? <LoaderCircle className="h-12 w-12 animate-spin text-primary" /> : null}
        {status === 'success' ? <CheckCircle2 className="h-12 w-12 text-success" /> : null}
        {status === 'error' ? <ShieldAlert className="h-12 w-12 text-danger" /> : null}

        <h1 className="mt-6 font-display text-4xl">
          {status === 'success' ? 'Verification complete' : 'Email verification'}
        </h1>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{message}</p>
        <Link href="/login" className={`${buttonVariants()} mt-8`}>
          Go to login
        </Link>
      </CardContent>
    </Card>
  );
}
