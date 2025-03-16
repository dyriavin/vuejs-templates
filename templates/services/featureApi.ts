/**
 * Feature API Service
 * 
 * Handles all API calls related to the feature
 */
import { FeatureItem, FeatureFilters, FeatureFormData, FeatureListResponse } from '../types';
import { httpClient } from '@/services/httpClient'; // Assuming this exists at project level

const API_BASE_PATH = '/api/features';

export const featureApiService = {
  /**
   * Get a list of feature items with filters
   */
  async getItems(filters: FeatureFilters): Promise<FeatureItem[]> {
    const response = await httpClient.get<FeatureListResponse>(API_BASE_PATH, {
      params: {
        search: filters.search,
        sort_by: filters.sortBy,
        sort_direction: filters.sortDirection,
        page: filters.page,
        per_page: filters.perPage
      }
    });
    return response.data.data;
  },

  /**
   * Get a single feature item by ID
   */
  async getItem(id: string): Promise<FeatureItem> {
    const response = await httpClient.get<{ data: FeatureItem }>(`${API_BASE_PATH}/${id}`);
    return response.data.data;
  },

  /**
   * Create a new feature item
   */
  async createItem(data: FeatureFormData): Promise<FeatureItem> {
    const response = await httpClient.post<{ data: FeatureItem }>(API_BASE_PATH, data);
    return response.data.data;
  },

  /**
   * Update an existing feature item
   */
  async updateItem(id: string, data: FeatureFormData): Promise<FeatureItem> {
    const response = await httpClient.put<{ data: FeatureItem }>(`${API_BASE_PATH}/${id}`, data);
    return response.data.data;
  },

  /**
   * Delete a feature item
   */
  async deleteItem(id: string): Promise<void> {
    await httpClient.delete(`${API_BASE_PATH}/${id}`);
  }
}; 