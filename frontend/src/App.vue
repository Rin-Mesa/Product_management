<script setup>
import { ref, onMounted } from 'vue'

import ProductForm from './components/ProductForm.vue'
import ProductList from './components/ProductList.vue'
import ProductEdit from './components/ProductEdit.vue'

import productService from './services/productService'

const products = ref([])

const selectedProduct = ref(null)

const loadProducts = async ()=>{

  const response =
  await productService.getProducts()

  products.value = response.data
}

const addProduct = async(product)=>{

  await productService.createProduct(product)

  loadProducts()
}

const deleteProduct = async(id)=>{

  await productService.deleteProduct(id)

  loadProducts()
}

const editProduct = (product)=>{
  selectedProduct.value = product
}

const updateProduct = async(product)=>{

  await productService.updateProduct(
    product.id,
    product
  )

  selectedProduct.value = null

  loadProducts()
}

onMounted(()=>{
  loadProducts()
})
</script>

<template>

<div class="container">

<h1>Product Management System</h1>

<ProductForm
@add="addProduct"
/>

<hr>

<ProductEdit
:product="selectedProduct"
@update="updateProduct"
/>

<hr>

<ProductList
:products="products"
@delete="deleteProduct"
@edit="editProduct"
/>

</div>

</template>