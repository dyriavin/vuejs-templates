# Feature Template

This directory serves as a template for implementing new features following our feature-based architecture pattern. It demonstrates the recommended structure and patterns for organizing feature code.

## Structure

```
feature-name/
│
├── index.ts                  # Feature entry point, exports public API
├── types.ts                  # TypeScript types and interfaces for the feature
├── constants.ts              # Constants and enumerations
│
├── components/               # UI components specific to this feature
│   ├── FeatureContainer.vue  # Main container component
│   ├── FeatureHeader.vue     # Header component with actions, filters, etc.
│   ├── FeatureList.vue       # List component for displaying items
│   ├── FeatureDetail.vue     # Detail view for a single item
│   ├── FeatureForm.vue       # Form for creating/editing items
│   ├── FeatureFilters.vue    # Filters component
│   └── index.ts              # Re-exports all components
│
├── composables/              # Feature-specific composables
│   ├── useFeatureData.ts     # Handles data fetching and manipulation
│   ├── useFeatureFilters.ts  # Manages filter state and filter operations
│   ├── useFeatureForm.ts     # Form state and validation logic
│   └── index.ts              # Re-exports all composables
│
├── services/                 # API and external services
│   ├── featureApi.ts         # API calls specific to this feature
│   └── index.ts              # Re-exports all services
│
├── utils/                    # Feature-specific utilities
│   ├── formatters.ts         # Data formatting functions
│   ├── validators.ts         # Validation utilities
│   └── index.ts              # Re-exports all utilities
│
└── views/                    # Route view components
    ├── FeatureListView.vue   # Route component for list view
    ├── FeatureDetailView.vue # Route component for detail view
    └── FeatureFormView.vue   # Route component for create/edit view
```

## Usage

To create a new feature:

1. Copy this template directory to `resources/js/features/your-feature-name`
2. Rename components and update imports to match your feature name
3. Define your feature's data models in `types.ts`
4. Implement your API service in `services/featureApi.ts`
5. Build your composables to manage feature state and logic
6. Create your UI components and views
7. Export the feature's public API from `index.ts`

## Key Patterns

### Composable-Centric Architecture

Feature state and logic are primarily managed through composables:

```typescript
// Example usage of a feature composable
const { 
  items,
  loading,
  error,
  loadItems 
} = useFeatureData();
```

### Higher-Level UI Abstractions

Use higher-level components for common UI patterns:

```vue
<ResourceDisplay
  :loading="loading"
  :error="error"
  :empty="items.length === 0"
  empty-message="No items found."
  @retry="loadItems"
>
  <FeatureList :items="items" />
</ResourceDisplay>
```

### TDD Workflow

Follow this workflow when implementing feature components:

1. Write tests first
2. Implement the minimal code to pass tests
3. Refactor while keeping tests green
4. Document usage and patterns

## Best Practices

1. **Keep components focused** - Each component should have a single responsibility
2. **Use TypeScript** - Define proper types for all feature models and APIs
3. **Test-driven development** - Write tests before implementation
4. **Documentation** - Add JSDoc comments to composables and utilities
5. **Naming conventions** - Follow consistent naming patterns across features

## Example Files

This template includes example implementations of:

- `types.ts` - Data models and interfaces
- `composables/useFeatureData.ts` - Feature data management
- `services/featureApi.ts` - API service
- `components/FeatureList.vue` - List component
- `views/FeatureListView.vue` - Route view component
- `utils/formatters.ts` - Utility functions

Refer to these files as examples when implementing your feature. 