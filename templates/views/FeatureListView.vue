<template>
  <div class="feature-list-view">
    <!-- Feature header with title and actions -->
    <FeatureHeader 
      title="Feature Items" 
      :loading="loading"
      @create="navigateToCreate"
    />
    
    <!-- Filters for the feature list -->
    <FeatureFilters 
      v-model="filters" 
      @update:model-value="updateFilters" 
    />
    
    <!-- Resource display component to handle loading/error/empty states -->
    <ResourceDisplay
      :loading="loadingItems"
      :error="itemsError"
      :empty="filteredItems.length === 0"
      empty-message="No items found matching your criteria."
      @retry="loadItems"
    >
      <!-- Item list -->
      <FeatureList 
        :items="filteredItems" 
        @view="navigateToDetail"
        @edit="navigateToEdit"
        @delete="confirmDelete"
      />
      
      <!-- Pagination -->
      <div class="mt-4 flex justify-center">
        <BearPagination
          v-model="filters.page"
          :total-pages="totalPages"
          :disabled="loading"
          @update:model-value="updatePage"
        />
      </div>
    </ResourceDisplay>
    
    <!-- Delete confirmation modal -->
    <BearModal
      v-if="showDeleteModal"
      title="Confirm Delete"
      @close="showDeleteModal = false"
    >
      <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      
      <template #footer>
        <div class="flex justify-end space-x-3">
          <BearButton
            variant="secondary"
            @click="showDeleteModal = false"
          >
            Cancel
          </BearButton>
          <BearButton
            variant="danger"
            :loading="savingItem"
            @click="handleDelete"
          >
            Delete
          </BearButton>
        </div>
      </template>
    </BearModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFeatureData } from '../composables/useFeatureData';
import FeatureHeader from '../components/FeatureHeader.vue';
import FeatureFilters from '../components/FeatureFilters.vue';
import FeatureList from '../components/FeatureList.vue';
import { ResourceDisplay } from '@/components/ResourceDisplay';
import { BearButton, BearModal, BearPagination } from '@/base/components';

// Router for navigation
const router = useRouter();

// Feature data composable
const { 
  filteredItems, 
  filters, 
  loading, 
  loadingItems,
  savingItem,
  itemsError, 
  loadItems, 
  deleteItem,
  updateFilters
} = useFeatureData();

// State for delete confirmation
const showDeleteModal = ref(false);
const itemToDelete = ref<string | null>(null);

// Computed for total pages
const totalPages = computed(() => Math.ceil(filteredItems.value.length / filters.value.perPage));

// Load items when component mounts
onMounted(() => {
  loadItems();
});

// Navigation functions
const navigateToCreate = () => {
  router.push({ name: 'feature-create' });
};

const navigateToDetail = (id: string) => {
  router.push({ name: 'feature-detail', params: { id } });
};

const navigateToEdit = (id: string) => {
  router.push({ name: 'feature-edit', params: { id } });
};

// Delete functions
const confirmDelete = (id: string) => {
  itemToDelete.value = id;
  showDeleteModal.value = true;
};

const handleDelete = async () => {
  if (!itemToDelete.value) return;
  
  try {
    await deleteItem(itemToDelete.value);
    showDeleteModal.value = false;
    itemToDelete.value = null;
    await loadItems();
  } catch (error) {
    console.error('Failed to delete item:', error);
  }
};

// Update page
const updatePage = (page: number) => {
  updateFilters({ page });
};
</script> 