/**
 * Feature item interface representing the main data structure for this feature
 */
export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  // Add other properties specific to this feature
}

/**
 * Filter options for the feature list
 */
export interface FeatureFilters {
  search: string;
  sortBy: 'createdAt' | 'title' | 'updatedAt';
  sortDirection: 'asc' | 'desc';
  page: number;
  perPage: number;
  // Add other filter properties
}

/**
 * Form data for creating/editing a feature item
 */
export interface FeatureFormData {
  title: string;
  description: string;
  // Add other form fields
}

/**
 * API response format for feature items list
 */
export interface FeatureListResponse {
  data: FeatureItem[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    lastPage: number;
  };
}

/**
 * Feature item status enum
 */
export enum FeatureItemStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
} 