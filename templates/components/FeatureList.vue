<template>
  <div class="feature-list">
    <!-- List of feature items -->
    <div class="space-y-4">
      <BearCard 
        v-for="item in items" 
        :key="item.id"
        class="hover:shadow-md transition-shadow duration-200"
      >
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold truncate">{{ item.title }}</h3>
            <div class="flex items-center space-x-2">
              <BearButton 
                size="sm" 
                variant="primary"
                @click="$emit('view', item.id)"
              >
                View
              </BearButton>
              <BearButton 
                size="sm" 
                variant="secondary"
                @click="$emit('edit', item.id)"
              >
                Edit
              </BearButton>
              <BearButton 
                size="sm" 
                variant="danger"
                @click="$emit('delete', item.id)"
              >
                Delete
              </BearButton>
            </div>
          </div>
        </template>
        
        <!-- Item content -->
        <div class="py-2">
          <p class="text-gray-600 line-clamp-2">{{ item.description }}</p>
        </div>
        
        <template #footer>
          <div class="flex justify-between text-sm text-gray-500">
            <span>Created: {{ formatDate(item.createdAt) }}</span>
            <span>Updated: {{ formatDate(item.updatedAt) }}</span>
          </div>
        </template>
      </BearCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FeatureItem } from '../types';
import { BearCard, BearButton } from '@/base/components';
import { formatDate } from '../utils/formatters';

// Define props
defineProps<{
  items: FeatureItem[];
}>();

// Define emits with proper type definitions
defineEmits<{
  (e: 'view', id: string): void;
  (e: 'edit', id: string): void;
  (e: 'delete', id: string): void;
}>();
</script> 