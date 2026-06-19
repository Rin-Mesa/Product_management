<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  product: Object,
  isSaving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update', 'cancel'])
const form = ref({})

watch(
  () => props.product,
  (value) => {
    form.value = value ? { ...value } : {}
  },
  { immediate: true }
)

const canUpdate = computed(() => (
  props.product &&
  form.value.name?.trim() &&
  form.value.price !== '' &&
  form.value.quantity !== '' &&
  !props.isSaving
))

const submit = () => {
  if (!canUpdate.value) return
  emit('update', form.value)
}
</script>

<template>
  <section class="edit-form-container" :class="{ empty: !product }">
    <div class="form-header">
      <div>
        <p class="section-kicker">Edit</p>
        <h2 class="form-title">{{ product ? product.name : 'No product selected' }}</h2>
      </div>
      <button v-if="product" type="button" class="btn-ghost" :disabled="isSaving" @click="$emit('cancel')">
        Cancel
      </button>
    </div>

    <form v-if="product" @submit.prevent="submit" class="product-form">
      <div class="selected-meta span-full">
        <span>ID #{{ product.id }}</span>
        <span>Editing mode</span>
      </div>

      <div class="form-group span-full">
        <label for="edit-name">Product name</label>
        <input id="edit-name" v-model="form.name" placeholder="Wireless mouse" required :disabled="isSaving" />
      </div>

      <div class="form-group span-full">
        <label for="edit-desc">Description</label>
        <textarea id="edit-desc" v-model="form.description" placeholder="Describe the product" :disabled="isSaving"></textarea>
      </div>

      <div class="form-group">
        <label for="edit-price">Price</label>
        <div class="input-with-prefix">
          <span>$</span>
          <input id="edit-price" type="number" v-model="form.price" placeholder="0.00" step="0.01" min="0" required :disabled="isSaving" />
        </div>
      </div>

      <div class="form-group">
        <label for="edit-qty">Quantity</label>
        <input id="edit-qty" type="number" v-model="form.quantity" placeholder="0" min="0" required :disabled="isSaving" />
      </div>

      <div class="form-actions span-full">
        <button class="btn-primary" type="submit" :disabled="!canUpdate">
          {{ isSaving ? 'Updating...' : 'Update Product' }}
        </button>
      </div>
    </form>

    <div v-else class="empty-edit-state">
      <p>Select a product from the table to update its details.</p>
    </div>
  </section>
</template>

<style scoped>
.edit-form-container {
  background: #111827;
  border: 1px solid #2f3b4f;
  border-radius: 8px;
  padding: 22px;
  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.24);
}

.edit-form-container.empty {
  min-height: 232px;
}

.form-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 18px;
}

.section-kicker {
  color: #60a5fa;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2px;
}

.form-title {
  margin: 0;
  color: #f8fafc;
  font-size: 1.28rem;
  line-height: 1.2;
  font-weight: 750;
  overflow-wrap: anywhere;
}

.product-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.span-full {
  grid-column: 1 / -1;
}

.selected-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 10px;
  border: 1px solid rgba(96, 165, 250, 0.28);
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.08);
  color: #bfdbfe;
  font-size: 0.82rem;
  font-weight: 800;
}

.form-group {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

label {
  color: #cbd5e1;
  font-size: 0.84rem;
  font-weight: 650;
  margin-bottom: 7px;
}

input,
textarea {
  width: 100%;
  background: #0f172a;
  border: 1px solid #334155;
  color: #f8fafc;
  padding: 11px 12px;
  border-radius: 6px;
  font: inherit;
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s, opacity 0.2s;
}

input:disabled,
textarea:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

input::placeholder,
textarea::placeholder {
  color: #64748b;
}

input:focus,
textarea:focus {
  outline: none;
  background: #111c32;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.18);
}

textarea {
  min-height: 104px;
  resize: vertical;
}

.input-with-prefix {
  position: relative;
}

.input-with-prefix span {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-weight: 700;
  pointer-events: none;
}

.input-with-prefix input {
  padding-left: 28px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2px;
}

.btn-primary,
.btn-ghost {
  min-height: 38px;
  border-radius: 6px;
  font-weight: 800;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, transform 0.2s, opacity 0.2s;
}

.btn-primary {
  background: #3b82f6;
  color: #eff6ff;
  border: none;
  padding: 0 18px;
}

.btn-primary:hover:not(:disabled) {
  background: #60a5fa;
  transform: translateY(-1px);
}

.btn-primary:disabled,
.btn-ghost:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.btn-ghost {
  background: transparent;
  color: #cbd5e1;
  border: 1px solid #334155;
  padding: 0 12px;
}

.btn-ghost:hover:not(:disabled) {
  border-color: #60a5fa;
  color: #f8fafc;
}

.empty-edit-state {
  display: grid;
  min-height: 130px;
  place-items: center;
  border: 1px dashed #334155;
  border-radius: 8px;
  padding: 20px;
  color: #94a3b8;
  text-align: center;
}

@media (max-width: 560px) {
  .edit-form-container {
    padding: 18px;
  }

  .product-form {
    grid-template-columns: 1fr;
  }

  .selected-meta {
    flex-direction: column;
  }

  .form-actions {
    justify-content: stretch;
  }

  .btn-primary {
    width: 100%;
  }
}
</style>
