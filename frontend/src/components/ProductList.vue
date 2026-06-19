<script setup>
defineProps({
  products: Array
})

defineEmits([
  'delete',
  'edit'
])
</script>

<template>
  <div class="table-container">
    <table v-if="products && products.length > 0">
      <thead>
        <tr>
          <th class="col-id">ID</th>
          <th class="col-name">Name</th>
          <th class="col-desc">Description</th>
          <th class="col-price">Price</th>
          <th class="col-qty">Quantity</th>
          <th class="col-actions">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="col-id font-mono">{{ product.id }}</td>
          <td class="col-name font-bold">{{ product.name }}</td>
          <td class="col-desc">{{ product.description || '—' }}</td>
          <td class="col-price">${{ Number(product.price).toFixed(2) }}</td>
          <td class="col-qty">{{ product.quantity }}</td>
          <td class="col-actions">
            <div class="action-buttons">
              <button class="btn-action btn-edit" @click="$emit('edit', product)">
                Edit
              </button>
              <button class="btn-action btn-delete" @click="$emit('delete', product.id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Elegant empty state instead of rendering empty borders -->
    <div v-else class="empty-state">
      <p>No products available. Fill out the form above to add your first item.</p>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  width: 100%;
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  margin-top: 24px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}

th {
  background-color: #252525;
  color: #aaa;
  font-weight: 600;
  padding: 14px 16px;
  border-bottom: 2px solid #333;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

td {
  padding: 14px 16px;
  color: #e0e0e0;
  border-bottom: 1px solid #2d2d2d;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td {
  background-color: #252525; /* Subtle row highlight on hover */
}

/* Column Specific Alignments & Widths */
.col-id { width: 80px; color: #666; }
.font-mono { font-family: monospace; }
.font-bold { font-weight: 500; color: #fff; }

.col-price { text-align: right; width: 100px; }
th.col-price { text-align: right; }

.col-qty { text-align: right; width: 100px; }
th.col-qty { text-align: right; }

.col-actions { text-align: center; width: 160px; }
th.col-actions { text-align: center; }

/* Action Buttons Styles */
.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn-action {
  padding: 6px 12px;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.btn-edit {
  background-color: #2a2a2a;
  color: #3b82f6;
  border: 1px solid #3b82f6;
}

.btn-edit:hover {
  background-color: #3b82f6;
  color: #fff;
}

.btn-delete {
  background-color: #2a2a2a;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.btn-delete:hover {
  background-color: #ef4444;
  color: #fff;
}

/* Empty State Handling */
.empty-state {
  padding: 40px;
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>