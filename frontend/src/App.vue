<script setup>
import { computed, ref, onMounted } from 'vue'

import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'
import ProductEdit from './components/ProductEdit.vue'

import productService from './services/productService'

const products = ref([])
const selectedProduct = ref(null)
const isLoading = ref(false)
const isCreating = ref(false)
const isUpdating = ref(false)
const isDeleting = ref(false)
const notice = ref('')
const errorMessage = ref('')

const totalValue = computed(() => products.value.reduce((total, product) => {
  return total + (Number(product.price) || 0) * (Number(product.quantity) || 0)
}, 0))

const lowStockCount = computed(() => products.value.filter((product) => Number(product.quantity) <= 5).length)

const showNotice = (message) => {
  notice.value = message
  setTimeout(() => {
    if (notice.value === message) notice.value = ''
  }, 2500)
}

const handleError = (message) => {
  errorMessage.value = message
  setTimeout(() => {
    if (errorMessage.value === message) errorMessage.value = ''
  }, 4000)
}

const loadProducts = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await productService.getProducts()
    products.value = response.data
  } catch (error) {
    handleError('Could not load products. Please check the API connection.')
  } finally {
    isLoading.value = false
  }
}

const addProduct = async (product) => {
  isCreating.value = true
  errorMessage.value = ''

  try {
    await productService.createProduct(product)
    await loadProducts()
    showNotice('Product added successfully.')
  } catch (error) {
    handleError('Could not add this product. Please review the details and try again.')
  } finally {
    isCreating.value = false
  }
}

const deleteProduct = async (id) => {
  isDeleting.value = true
  errorMessage.value = ''

  try {
    await productService.deleteProduct(id)
    if (selectedProduct.value?.id === id) selectedProduct.value = null
    await loadProducts()
    showNotice('Product deleted.')
  } catch (error) {
    handleError('Could not delete this product. Please try again.')
  } finally {
    isDeleting.value = false
  }
}

const editProduct = (product) => {
  selectedProduct.value = product
}

const cancelEdit = () => {
  selectedProduct.value = null
}

const updateProduct = async (product) => {
  isUpdating.value = true
  errorMessage.value = ''

  try {
    await productService.updateProduct(product.id, product)
    selectedProduct.value = null
    await loadProducts()
    showNotice('Product updated successfully.')
  } catch (error) {
    handleError('Could not update this product. Please check the fields and try again.')
  } finally {
    isUpdating.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <main class="app-shell">
    <section class="page-heading">
      <div>
        <p class="eyebrow">Inventory workspace</p>
        <h1>Product Management System</h1>
      </div>
      <div class="summary-grid" aria-label="Inventory summary">
        <div class="summary-card">
          <span class="summary-value">{{ products.length }}</span>
          <span class="summary-label">Products</span>
        </div>
        <div class="summary-card warning" :class="{ active: lowStockCount > 0 }">
          <span class="summary-value">{{ lowStockCount }}</span>
          <span class="summary-label">Low stock</span>
        </div>
        <div class="summary-card value-card">
          <span class="summary-value">${{ totalValue.toFixed(2) }}</span>
          <span class="summary-label">Inventory value</span>
        </div>
      </div>
    </section>

    <div class="feedback-stack" aria-live="polite">
      <p v-if="notice" class="feedback success">{{ notice }}</p>
      <p v-if="errorMessage" class="feedback error">{{ errorMessage }}</p>
    </div>

    <section class="workspace-grid">
      <ProductForm
        :is-saving="isCreating"
        @add="addProduct"
      />

      <ProductEdit
        :product="selectedProduct"
        :is-saving="isUpdating"
        @update="updateProduct"
        @cancel="cancelEdit"
      />
    </section>

    <ProductList
      :products="products"
      :is-loading="isLoading"
      :is-deleting="isDeleting"
      :selected-id="selectedProduct?.id"
      @delete="deleteProduct"
      @edit="editProduct"
    />
  </main>
</template>

<style scoped>
.app-shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 40px 0 56px;
}

.page-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 24px;
  margin-bottom: 18px;
}

.eyebrow {
  color: #38bdf8;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 6px;
}

h1 {
  color: #f8fafc;
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  line-height: 1.1;
  font-weight: 750;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(112px, 1fr));
  gap: 10px;
}

.summary-card {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid #2f3b4f;
  border-radius: 8px;
  background: #111827;
  color: #cbd5e1;
}

.summary-card.warning.active {
  border-color: rgba(251, 191, 36, 0.55);
  background: rgba(120, 53, 15, 0.22);
}

.summary-value {
  color: #f8fafc;
  font-size: 1.25rem;
  line-height: 1.15;
  font-weight: 800;
  white-space: nowrap;
}

.value-card .summary-value {
  font-size: 1.05rem;
}

.summary-label {
  color: #94a3b8;
  font-size: 0.82rem;
  font-weight: 700;
}

.feedback-stack {
  display: grid;
  gap: 10px;
  margin-bottom: 18px;
}

.feedback {
  border-radius: 8px;
  padding: 12px 14px;
  font-weight: 700;
}

.feedback.success {
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(52, 211, 153, 0.38);
  color: #bbf7d0;
}

.feedback.error {
  background: rgba(225, 29, 72, 0.12);
  border: 1px solid rgba(251, 113, 133, 0.42);
  color: #fecdd3;
}

.workspace-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
  gap: 20px;
  align-items: start;
  margin-bottom: 24px;
}

@media (max-width: 980px) {
  .page-heading {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .summary-grid {
    width: 100%;
  }
}

@media (max-width: 860px) {
  .app-shell {
    width: min(100% - 24px, 680px);
    padding-top: 28px;
  }

  .workspace-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 620px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
