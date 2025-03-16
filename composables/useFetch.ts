/**
 * useFetch Composable
 *
 * A lightweight wrapper around fetch operations that provides:
 * - Loading state tracking
 * - Error handling
 * - Type-safe response handling
 * - Consistent API for all data fetching operations
 * 
 * @example
 * ```typescript
 * // Example usage in a component or another composable
 * const { data, loading, error, execute } = useFetch<User>();
 * 
 * // Fetch data
 * const fetchUser = async (id: string) => {
 *   await execute(() => api.getUser(id));
 * };
 * ```
 */
import { ref, shallowRef } from 'vue';

/**
 * Hook for managing async data fetching with loading and error states
 */
export function useFetch<T>() {
  // Use shallowRef for potentially complex objects to improve performance
  const data = shallowRef<T | null>(null);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  
  /**
   * Execute a fetch operation
   * 
   * @param fetchFunction The function that returns a promise with the data
   * @returns The fetched data or null if an error occurred
   */
  const execute = async (fetchFunction: () => Promise<T>): Promise<T | null> => {
    // Reset state before fetching
    loading.value = true;
    error.value = null;
    
    try {
      // Await the fetch function result
      const result = await fetchFunction();
      data.value = result;
      return result;
    } catch (err) {
      // Normalize error handling
      error.value = err instanceof Error ? err : new Error(String(err));
      return null;
    } finally {
      // Always mark loading as complete
      loading.value = false;
    }
  };
  
  return {
    data,
    loading,
    error,
    execute
  };
}

/**
 * Provides the same API as useFetch but with a mock implementation for testing
 */
export function createMockUseFetch<T>(mockData: T) {
  const data = shallowRef<T | null>(mockData);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  
  const execute = async (): Promise<T> => {
    loading.value = true;
    await new Promise(resolve => setTimeout(resolve, 100));
    loading.value = false;
    return mockData;
  };
  
  return {
    data,
    loading,
    error,
    execute
  };
} 