'use client';

import { useCallback, useEffect, useState } from 'react';

export function useApiQuery(queryFn, options = {}) {
  const { immediate = true, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(immediate);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await queryFn();
      setData(response);
      return response;
    } catch (queryError) {
      setError(queryError);
      throw queryError;
    } finally {
      setLoading(false);
    }
  }, [queryFn]);

  useEffect(() => {
    if (immediate) {
      execute().catch(() => null);
    }
  }, [execute, immediate]);

  return {
    data,
    error,
    loading,
    execute,
    setData,
  };
}
