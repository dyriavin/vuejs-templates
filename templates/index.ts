// Feature entry point that exports the public API of this feature

// Re-export types
export * from './types';

// Re-export composables
export * from './composables';

// Re-export components
export * from './components';

// Re-export services
export * from './services';

// Re-export utilities
export * from './utils';

// Expose view components for routing
export { default as FeatureListView } from './views/FeatureListView.vue';
export { default as FeatureDetailView } from './views/FeatureDetailView.vue';
export { default as FeatureFormView } from './views/FeatureFormView.vue'; 