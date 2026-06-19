<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  isSaving: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['add'])

const form = ref({
  name: '',
  description: '',
  price: '',
  quantity: ''
})

const canSubmit = computed(() => (
  form.value.name.trim() &&
  form.value.price !== '' &&
  form.value.quantity !== '' &&
  !props.isSaving
))

const submit = () => {
  if (!canSubmit.value) return

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
  <section class="form-container">
    <div class="form-header">
      <div>
        <p class="section-kicker">Create</p>
        <h2 class="form-title">New product</h2>
      </div>
    </div>

    <form @submit.prevent="submit" class="product-form">
      <div class="form-group span-full">
        <label for="add-name">Product name</label>
        <input
          id="add-name"
          v-model="form.name"
          placeholder="Mechanical keyboard"
          required
          :disabled="isSaving"
        />
      </div>

      <div class="form-group span-full">
        <label for="add-desc">Description</label>
        <textarea
          id="add-desc"
          v-model="form.description"
          placeholder="Switch type, layout, color, or supplier notes"
          :disabled="isSaving"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="add-price">Price</label>
        <div class="input-with-prefix">
          <span>$</span>
          <input
            id="add-price"
            type="number"
            v-model="form.price"
            placeholder="0.00"
            step="0.01"
            min="0"
            required
            :disabled="isSaving"
          />
        </div>
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
          :disabled="isSaving"
        />
      </div>

      <div class="form-actions span-full">
        <button type="submit" class="btn-success" :disabled="!canSubmit">
          {{ isSaving ? 'Adding...' : 'Add Product' }}
        </button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.form-container {
  background: #111827;
  border: 1px solid #2f3b4f;
  border-radius: 8px;
  padding: 22px;
  box-shadow: 0 16px 36px rgba(2, 6, 23, 0.24);
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.section-kicker {
  color: #34d399;
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
}

.product-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.span-full {
  grid-column: 1 / -1;
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
  border-color: #34d399;
  box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.18);
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

.btn-success {
  min-height: 42px;
  background: #10b981;
  color: #03150f;
  border: none;
  padding: 0 18px;
  font-weight: 800;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s, opacity 0.2s;
}

.btn-success:hover:not(:disabled) {
  background: #34d399;
  transform: translateY(-1px);
}

.btn-success:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

@media (max-width: 560px) {
  .form-container {
    padding: 18px;
  }

  .product-form {
    grid-template-columns: 1fr;
  }

  .form-actions {
    justify-content: stretch;
  }

  .btn-success {
    width: 100%;
  }
}
</style>
