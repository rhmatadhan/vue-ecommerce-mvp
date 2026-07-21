import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`)
  return response.data
}

export const getProductDetail = async (id) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`)
  return response.data
}

export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/products/categories`)
  return response.data
}

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${BASE_URL}/products/category/${category}`)
  return response.data
}

// Cart API endpoints
export const getUserCart = async (userId = 1) => {
  const response = await axios.get(`${BASE_URL}/carts/user/${userId}`)
  return response.data
}

export const getCart = async (cartId = 1) => {
  const response = await axios.get(`${BASE_URL}/carts/${cartId}`)
  return response.data
}

export const addCartApi = async (cartData) => {
  const response = await axios.post(`${BASE_URL}/carts`, cartData)
  return response.data
}

export const updateCartApi = async (cartId, cartData) => {
  const response = await axios.put(`${BASE_URL}/carts/${cartId}`, cartData)
  return response.data
}

export const deleteCartApi = async (cartId) => {
  const response = await axios.delete(`${BASE_URL}/carts/${cartId}`)
  return response.data
}

// User API endpoints
export const getUserProfile = async (userId = 1) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}`)
  return response.data
}

