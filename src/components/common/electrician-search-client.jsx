'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { ElectricianCard } from '@/components/cards/electrician-card';
import { EmptyState } from '@/components/common/empty-state';
import { Skeletonizer } from '@/components/common/skeletonizer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { showErrorToast } from '@/lib/error-toast';
import { getCurrentCoordinates } from '@/lib/browser-geolocation';
import { apiClient, unwrapRequest } from '@/lib/api-client';

export function ElectricianSearchClient() {
  const [filters, setFilters] = useState({ skill: '', serviceArea: '', radiusKm: '20' });
  const [items, setItems] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const bootstrappedRef = useRef(false);

  const handleSearch = useCallback(async (overrides = {}) => {
    setLoading(true);

    try {
      const effectiveCoordinates =
        overrides.latitude && overrides.longitude
          ? { latitude: overrides.latitude, longitude: overrides.longitude }
          : coordinates || {};

      const response = await unwrapRequest(
        apiClient.get('/electricians/search', {
          params: {
            ...filters,
            radiusKm: Number(filters.radiusKm || 20),
            ...effectiveCoordinates,
            ...overrides,
          },
        })
      );
      setItems(response);
    } catch (error) {
      showErrorToast(error, 'Unable to search electricians');
    } finally {
      setLoading(false);
    }
  }, [coordinates, filters]);

  useEffect(() => {
    if (bootstrappedRef.current) {
      return;
    }

    bootstrappedRef.current = true;
    let active = true;

    getCurrentCoordinates({ timeout: 8000, maximumAge: 60_000 })
      .then((result) => {
        if (!active) {
          return;
        }

        const nextCoordinates = { latitude: result.latitude, longitude: result.longitude };
        setCoordinates(nextCoordinates);
        return handleSearch(nextCoordinates);
      })
      .catch(() => handleSearch());

    return () => {
      active = false;
    };
    // Intentionally run only once on mount; we don't want filter typing to re-trigger auto-fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-[2rem] border border-border bg-card/80 p-5 shadow-soft">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_9rem_auto]">
          <Input
            placeholder="Skill"
            value={filters.skill}
            onChange={(event) => setFilters((current) => ({ ...current, skill: event.target.value }))}
          />
          <Input
            placeholder="Service area"
            value={filters.serviceArea}
            onChange={(event) => setFilters((current) => ({ ...current, serviceArea: event.target.value }))}
          />
          <Input
            type="number"
            placeholder="Radius"
            value={filters.radiusKm}
            onChange={(event) => setFilters((current) => ({ ...current, radiusKm: event.target.value }))}
          />
          <Button onClick={() => handleSearch()}>
            <Search className="h-4 w-4" />
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </div>

      {loading ? (
        <Skeletonizer variant="electrician-list" count={3} />
      ) : items.length ? (
        items.map((electrician) => <ElectricianCard key={electrician.id} electrician={electrician} />)
      ) : (
        <EmptyState
          title="No electricians found"
          description="Try searching again, widening your radius, or removing filters."
        />
      )}
    </div>
  );
}
