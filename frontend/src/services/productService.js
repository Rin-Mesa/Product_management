import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

console.log('API_URL:', API_URL)

export default {
  getProducts() {
    return axios.get(`${API_URL}/products`)
  },

  createProduct(product) {
    return axios.post(`${API_URL}/products`, product)
  },

  updateProduct(id, product) {
    return axios.put(`${API_URL}/products/${id}`, product)
  },

  deleteProduct(id) {
    return axios.delete(`${API_URL}/products/${id}`)
  }
}