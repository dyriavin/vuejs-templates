/**
 * Feature data composable for managing feature items
 * 
 * This composable handles:
 * - Loading feature items with filtering/sorting
 * - Loading a single feature item
 * - Creating, updating and deleting feature items
 * - Managing loading/error states
 */
import { ref, computed, watch } from 'vue';
import { FeatureItem, FeatureFilters, FeatureFormData } from '../types';
import { featureApiService } from '../services/featureApi';
import { useFetch } from '@/composables/useFetch'; // Assuming this exists at project level

export function useFeatureData() {
  // Use the core fetch composable for items list
  const { 
    data: items, 
    loading: loadingItems, 
    error: itemsError, 
    execute: executeItemsFetch 
  } = useFetch<FeatureItem[]>();
  
  // Use another instance for single item operations
  const { 
    data: currentItem, 
    loading: loadingItem, 
    error: itemError, 
    execute: executeItemFetch 
  } = useFetch<FeatureItem>();
  
  // Use another instance for mutation operations
  const { 
    loading: savingItem, 
    error: saveError, 
    execute: executeSave 
  } = useFetch<FeatureItem>();
  
  // State for filters
  const filters = ref<FeatureFilters>({
    search: '',
    sortBy: 'createdAt',
    sortDirection: 'desc',
    page: 1,
    perPage: 10
  });
  
  // Computed property for total loading state
  const loading = computed(() => loadingItems.value || loadingItem.value || savingItem.value);
  
  // Filtered items (could be handled server-side, this is for demonstration)
  const filteredItems = computed(() => {
    if (!items.value) return [];
    
    let result = [...items.value];
    
    // Apply search filter
    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchLower) || 
        item.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[filters.value.sortBy];
      const bValue = b[filters.value.sortBy];
      
      if (filters.value.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    return result;
  });
  
  // Load items with current filters
  const loadItems = async () => {
    return await executeItemsFetch(() => featureApiService.getItems(filters.value));
  };
  
  // Load a single item by ID
  const loadItem = async (id: string) => {
    return await executeItemFetch(() => featureApiService.getItem(id));
  };
  
  // Create a new item
  const createItem = async (data: FeatureFormData) => {
    return await executeSave(() => featureApiService.createItem(data));
  };
  
  // Update an existing item
  const updateItem = async (id: string, data: FeatureFormData) => {
    return await executeSave(() => featureApiService.updateItem(id, data));
  };
  
  // Delete an item
  const deleteItem = async (id: string) => {
    return await executeSave(() => featureApiService.deleteItem(id));
  };
  
  // Update filters and reload data
  const updateFilters = (newFilters: Partial<FeatureFilters>) => {
    filters.value = { ...filters.value, ...newFilters };
    return loadItems();
  };
  
  // Reset filters to defaults
  const resetFilters = () => {
    filters.value = {
      search: '',
      sortBy: 'createdAt',
      sortDirection: 'desc',
      page: 1,
      perPage: 10
    };
    return loadItems();
  };
  
  // Watch for filter changes to reload data
  watch(filters, () => {
    loadItems();
  }, { deep: true });
  
  return {
    // Data
    items,
    filteredItems,
    currentItem,
    filters,
    
    // Loading states
    loading,
    loadingItems,
    loadingItem,
    savingItem,
    
    // Error states
    itemsError,
    itemError,
    saveError,
    
    // Actions
    loadItems,
    loadItem,
    createItem,
    updateItem,
    deleteItem,
    updateFilters,
    resetFilters
  };
} 