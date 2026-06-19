<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add'])

const form = ref({
  name: '',
  description: '',
  price: '',
  quantity: ''
})

const submit = () => {
  emit('add', { ...form.value })

  form.value = {
    name: '',
    description: '',
    price: '',
    quantity: ''
  }
}
</script>

<template>
  <div class="form-container">
    <h3 class="form-title">Create New Product</h3>
    
    <form @submit.prevent="submit">
      <div class="form-group">
        <label for="add-name">Product Name</label>
        <input 
          id="add-name"
          v-model="form.name" 
          placeholder="e.g., Mechanical Keyboard" 
          required
        />
      </div>

      <div class="form-group">
        <label for="add-desc">Description</label>
        <textarea 
          id="add-desc"
          v-model="form.description" 
          placeholder="Enter product details..."
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="add-price">Price ($)</label>
          <input 
            id="add-price"
            type="number" 
            v-model="form.price" 
            placeholder="0.00" 
            step="0.01"
            min="0"
            required
          />
        </div>

        <div class="form-group">
          <label for="add-qty">Quantity</label>
          <input 
            id="add-qty"
            type="number" 
            v-model="form.quantity" 
            placeholder="0" 
            min="0"
            required
          />
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-success">Add Product</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  margin-bottom: 32px;
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
  border-color: #10b981; /* Fresh emerald green accent for adding products */
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
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

.btn-success {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-success:hover {
  background-color: #059669;
}
</style>