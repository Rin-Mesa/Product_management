<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isDeleting: {
    type: Boolean,
    default: false
  },
  selectedId: {
    type: [Number, String],
    default: null
  }
})

const emit = defineEmits([
  'delete',
  'edit'
])

const searchTerm = ref('')
const pendingDeleteId = ref(null)

const filteredProducts = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()
  if (!query) return props.products

  return props.products.filter((product) => [
    product.id,
    product.name,
    product.description,
    product.price,
    product.quantity
  ].some((value) => String(value ?? '').toLowerCase().includes(query)))
})

const hasProducts = computed(() => props.products.length > 0)

const requestDelete = (product) => {
  if (pendingDeleteId.value === product.id) {
    emit('delete', product.id)
    pendingDeleteId.value = null
    return
  }

  pendingDeleteId.value = product.id
}

const editProduct = (product) => {
  pendingDeleteId.value = null
  emit('edit', product)
}
</script>

<template>
  <section class="inventory-section">
    <div class="section-header">
      <div>
        <p class="section-kicker">Catalog</p>
        <h2>Products</h2>
      </div>

      <label class="search-box" for="product-search">
        <span>Search</span>
        <input
          id="product-search"
          v-model="searchTerm"
          type="search"
          placeholder="Name, ID, price..."
          :disabled="isLoading || !hasProducts"
        />
      </label>
    </div>

    <div class="table-container">
      <div v-if="isLoading" class="state-panel">
        <div class="loading-bar"></div>
        <p>Loading products...</p>
      </div>

      <table v-else-if="filteredProducts.length > 0">
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
          <tr
            v-for="product in filteredProducts"
            :key="product.id"
            :class="{ selected: selectedId === product.id }"
          >
            <td class="col-id font-mono">#{{ product.id }}</td>
            <td class="col-name font-bold">
              <span>{{ product.name }}</span>
              <span v-if="Number(product.quantity) <= 5" class="stock-warning">Low stock</span>
            </td>
            <td class="col-desc">{{ product.description || '-' }}</td>
            <td class="col-price">${{ Number(product.price).toFixed(2) }}</td>
            <td class="col-qty">
              <span class="qty-pill" :class="{ low: Number(product.quantity) <= 5 }">{{ product.quantity }}</span>
            </td>
            <td class="col-actions">
              <div class="action-buttons">
                <button class="btn-action btn-edit" :disabled="isDeleting" @click="editProduct(product)">
                  Edit
                </button>
                <button
                  class="btn-action btn-delete"
                  :class="{ confirm: pendingDeleteId === product.id }"
                  :disabled="isDeleting"
                  @click="requestDelete(product)"
                >
                  {{ pendingDeleteId === product.id ? 'Confirm' : 'Delete' }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else-if="hasProducts" class="state-panel">
        <h3>No matches found</h3>
        <p>Try another search term or clear the search field.</p>
      </div>

      <div v-else class="state-panel">
        <h3>No products yet</h3>
        <p>Add your first product above and it will appear here.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.inventory-section {
  margin-top: 4px;
}

.section-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.section-kicker {
  color: #38bdf8;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2px;
}

h2 {
  color: #f8fafc;
  font-size: 1.35rem;
  line-height: 1.2;
}

.search-box {
  display: grid;
  gap: 6px;
  width: min(100%, 280px);
  color: #cbd5e1;
  font-size: 0.8rem;
  font-weight: 800;
}

.search-box input {
  min-height: 40px;
  width: 100%;
  border: 1px solid #334155;
  border-radius: 6px;
  background: #0f172a;
  color: #f8fafc;
  padding: 0 12px;
  font: inherit;
  transition: border-color 0.2s, box-shadow 0.2s, opacity 0.2s;
}

.search-box input:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.16);
}

.search-box input:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.table-container {
  width: 100%;
  overflow-x: auto;
  background: #111827;
  border: 1px solid #2f3b4f;
  border-radius: 8px;
  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.24);
}

table {
  width: 100%;
  min-width: 800px;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.94rem;
}

th {
  background: #182235;
  color: #94a3b8;
  font-weight: 800;
  padding: 13px 16px;
  border-bottom: 1px solid #2f3b4f;
  text-transform: uppercase;
  font-size: 0.73rem;
  letter-spacing: 0.06em;
}

td {
  padding: 15px 16px;
  color: #dbe4f0;
  border-bottom: 1px solid #243044;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover td,
tr.selected td {
  background: #162033;
}

tr.selected td:first-child {
  box-shadow: inset 3px 0 0 #60a5fa;
}

.col-id {
  width: 82px;
  color: #94a3b8;
}

.font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.font-bold {
  color: #f8fafc;
  font-weight: 750;
}

.col-name {
  min-width: 190px;
}

.col-name span {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
}

.stock-warning {
  padding: 3px 7px;
  border-radius: 999px;
  background: rgba(251, 191, 36, 0.13);
  border: 1px solid rgba(251, 191, 36, 0.36);
  color: #fde68a;
  font-size: 0.72rem;
  font-weight: 900;
}

.col-desc {
  min-width: 230px;
  color: #a8b3c4;
}

.col-price,
.col-qty {
  text-align: right;
  width: 115px;
}

th.col-price,
th.col-qty {
  text-align: right;
}

.col-actions {
  text-align: right;
  width: 178px;
}

th.col-actions {
  text-align: right;
}

.qty-pill {
  display: inline-flex;
  min-width: 38px;
  justify-content: center;
  padding: 4px 9px;
  border-radius: 999px;
  background: #0f172a;
  border: 1px solid #334155;
  color: #e2e8f0;
  font-weight: 800;
}

.qty-pill.low {
  border-color: rgba(251, 191, 36, 0.42);
  color: #fde68a;
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.btn-action {
  min-height: 34px;
  padding: 0 12px;
  font-size: 0.84rem;
  font-weight: 800;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, transform 0.2s, opacity 0.2s;
}

.btn-action:hover:not(:disabled) {
  transform: translateY(-1px);
}

.btn-action:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.btn-edit {
  background: rgba(59, 130, 246, 0.08);
  color: #93c5fd;
  border: 1px solid rgba(96, 165, 250, 0.45);
}

.btn-edit:hover:not(:disabled) {
  background: #3b82f6;
  border-color: #3b82f6;
  color: #eff6ff;
}

.btn-delete {
  background: rgba(244, 63, 94, 0.08);
  color: #fda4af;
  border: 1px solid rgba(251, 113, 133, 0.45);
}

.btn-delete:hover:not(:disabled),
.btn-delete.confirm {
  background: #e11d48;
  border-color: #e11d48;
  color: #fff1f2;
}

.state-panel {
  display: grid;
  place-items: center;
  min-height: 220px;
  padding: 36px 20px;
  color: #94a3b8;
  text-align: center;
}

.state-panel h3 {
  color: #f8fafc;
  font-size: 1.15rem;
  margin-bottom: 6px;
}

.loading-bar {
  width: min(240px, 75%);
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #1e293b;
  margin-bottom: 14px;
}

.loading-bar::before {
  content: '';
  display: block;
  width: 45%;
  height: 100%;
  border-radius: inherit;
  background: #38bdf8;
  animation: loading-slide 1s ease-in-out infinite;
}

@keyframes loading-slide {
  0% {
    transform: translateX(-110%);
  }

  100% {
    transform: translateX(240%);
  }
}

@media (max-width: 620px) {
  .section-header {
    align-items: stretch;
    flex-direction: column;
  }

  .search-box {
    width: 100%;
  }
}
</style>
