'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GeocodeLocationButton } from '@/components/common/geocode-location-button';
import { CurrentLocationButton } from '@/components/common/current-location-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { showErrorToast } from '@/lib/error-toast';

export function ProfileEditorCard({
  title,
  description,
  fields,
  value,
  onSave,
  locationSourceField,
  latitudeField = 'latitude',
  longitudeField = 'longitude',
  locationButtonLabel = 'Get latitude & longitude',
}) {
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormValues(
      fields.reduce((accumulator, field) => {
        accumulator[field.name] = value?.[field.name] ?? '';
        return accumulator;
      }, {})
    );
  }, [fields, value]);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      await onSave?.(formValues);
      toast.success('Profile updated successfully.');
    } catch (error) {
      showErrorToast(error, 'Unable to update profile');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-border/70 bg-card/90">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.name}
                  className="mt-2"
                  value={formValues[field.name] || ''}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                />
              ) : (
                <Input
                  id={field.name}
                  type={field.type || 'text'}
                  className="mt-2"
                  value={formValues[field.name] || ''}
                  onChange={(event) =>
                    setFormValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                />
              )}
              {locationSourceField === field.name ? (
                <div className="mt-3 space-y-3">
                  <GeocodeLocationButton
                    location={formValues[locationSourceField]}
                    buttonLabel={locationButtonLabel}
                    onResolved={({ formattedAddress, latitude, longitude }) =>
                      setFormValues((current) => ({
                        ...current,
                        [locationSourceField]: formattedAddress,
                        [latitudeField]: latitude,
                        [longitudeField]: longitude,
                      }))
                    }
                  />
                  <CurrentLocationButton
                    onResolved={({ latitude, longitude }) =>
                      setFormValues((current) => ({
                        ...current,
                        [latitudeField]: latitude,
                        [longitudeField]: longitude,
                      }))
                    }
                  />
                </div>
              ) : null}
            </div>
          ))}
          <div className="md:col-span-2">
            <Button disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
