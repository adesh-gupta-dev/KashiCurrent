'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showErrorToast } from '@/lib/error-toast';
import { apiClient, unwrapRequest } from '@/lib/api-client';

export function ContactFormCard() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      subject: String(formData.get('subject') || ''),
      message: String(formData.get('message') || ''),
    };

    try {
      const response = await unwrapRequest(apiClient.post('/contact', payload));
      toast.success(response.message || 'Your message has been sent successfully.');
      event.currentTarget.reset();
    } catch (error) {
      showErrorToast(error, 'Unable to send message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle>Contact KashiCurrent</CardTitle>
        <CardDescription>
          Share your project, escalation, or partnership question and we will route it to the right team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" name="name" className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" name="email" className="mt-2" type="email" required />
            </div>
          </div>
          <div>
            <Label htmlFor="contact-subject">Subject</Label>
            <Input id="contact-subject" name="subject" className="mt-2" required />
          </div>
          <div>
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" name="message" className="mt-2" required />
          </div>
          <Button size="lg" className="w-full" disabled={loading}>
            {loading ? 'Sending message...' : 'Send message'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
