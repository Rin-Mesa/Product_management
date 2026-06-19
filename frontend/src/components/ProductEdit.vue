<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  product: Object
})

const emit = defineEmits(['update'])
const form = ref({})

watch(
  () => props.product,
  (value) => {
    form.value = { ...value }
  },
  { immediate: true }
)

const submit = () => {
  emit('update', form.value)
}
</script>

<template>
  <div v-if="product" class="edit-form-container">
    <h3 class="form-title">Edit Product</h3>
    
    <div class="form-group">
      <label for="edit-name">Product Name</label>
      <input id="edit-name" v-model="form.name" placeholder="e.g., Wireless Mouse" />
    </div>

    <div class="form-group">
      <label for="edit-desc">Description</label>
      <textarea id="edit-desc" v-model="form.description" placeholder="Describe the product..."></textarea>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="edit-price">Price ($)</label>
        <input id="edit-price" type="number" v-model="form.price" placeholder="0.00" step="0.01" />
      </div>

      <div class="form-group">
        <label for="edit-qty">Quantity</label>
        <input id="edit-qty" type="number" v-model="form.quantity" placeholder="0" />
      </div>
    </div>

    <div class="form-actions">
      <button class="btn-primary" @click="submit">Update Product</button>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles to isolate the layout and make it look clean */
.edit-form-container {
  background-color: #1e1e1e; /* Soft dark background instead of pure black */
  border: 1px solid #333;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.form-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.25rem;
  color: #fff;
  font-weight: 600;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

label {
  font-size: 0.85rem;
  color: #aaa;
  margin-bottom: 6px;
  font-weight: 500;
}

input, textarea {
  background-color: #2a2a2a;
  border: 1px solid #444;
  color: #fff;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3b82f6; /* Modern Blue accent */
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

textarea {
  min-height: 80px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}
</style>