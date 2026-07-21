# Project Setup & Implementation Steps: Vue E-Commerce Prototype

Dokumen ini berisi panduan langkah demi langkah untuk melakukan setup dan implementasi awal proyek Vue E-Commerce Prototype (SPA) menggunakan FakeStore API. Ikuti tahapan ini secara berurutan.

## 1. Persiapan Proyek (Project Setup)
- [ ] **Inisialisasi Proyek Vue 3**: Buat proyek baru menggunakan Vite.
  - Perintah: `npm create vue@latest` (Pilih Vue Router dan Pinia saat ditanya, atau install manual nanti).
- [ ] **Install Dependencies Utama**: Pastikan dependensi berikut terinstall:
  - `vue-router` (Untuk routing antar halaman)
  - `pinia` (Untuk global state management keranjang belanja)
  - `axios` (Opsional, jika tidak ingin menggunakan `fetch` bawaan browser)
- [ ] **Setup Tailwind CSS**: 
  - Install Tailwind CSS: `npm install -D tailwindcss postcss autoprefixer`
  - Inisialisasi konfigurasi: `npx tailwindcss init -p`
  - Konfigurasi `tailwind.config.js` untuk memindai file `.vue`.
  - Tambahkan direktif Tailwind ke file CSS utama (misal: `src/assets/main.css`).

## 2. Struktur Folder & Konfigurasi Dasar
Buat/sesuaikan struktur folder di dalam `src/` agar rapi:
- [ ] `src/views/`: Tempat halaman utama (Home, Product Detail, Cart).
- [ ] `src/components/`: Tempat komponen reusable (ProductCard, Navbar, CartItem).
- [ ] `src/stores/`: Tempat state management Pinia (`cartStore.js`).
- [ ] `src/router/`: Tempat konfigurasi Vue Router (`index.js`).
- [ ] `src/services/` atau `src/api/`: Tempat fungsi untuk memanggil API FakeStore.

## 3. Konfigurasi Routing (Vue Router)
Daftarkan rute halaman berikut di `src/router/index.js`:
- [ ] `/` -> `HomeView.vue` (Menampilkan daftar produk & filter kategori).
- [ ] `/product/:id` -> `ProductDetailView.vue` (Menampilkan detail produk).
- [ ] `/cart` -> `CartView.vue` (Menampilkan isi keranjang belanja).

## 4. State Management Keranjang (Pinia)
Buat `src/stores/cart.js` (atau nama serupa) menggunakan Pinia:
- [ ] **State**: Simpan array `items` yang berisi produk yang ditambahkan ke keranjang beserta kuantitasnya (qty).
- [ ] **Getters**: Buat fungsi untuk menghitung `totalItems` (jumlah barang) dan `totalPrice` (subtotal harga).
- [ ] **Actions**: Buat fungsi untuk:
  - Menambah barang ke keranjang (jika sudah ada, tambahkan qty).
  - Mengurangi kuantitas barang.
  - Menghapus barang dari keranjang secara spesifik.
  - *Catatan: Jangan gunakan API /carts dari FakeStore. Kerjakan logic keranjang sepenuhnya di frontend.*

## 5. Integrasi API (FakeStore API)
Buat service untuk mengambil data dari `https://fakestoreapi.com/products`. Gunakan sintaks `<script setup>` (Composition API) di setiap komponen.
- [ ] **Ambil Semua Produk**: Endpoint `GET /products`. (Tampilkan loading state saat mengambil data).
- [ ] **Ambil Detail Produk**: Endpoint `GET /products/:id`.
- [ ] **Ambil List Kategori**: Endpoint `GET /products/categories`.
- [ ] **Filter by Kategori**: Endpoint `GET /products/category/:category_name`.

## 6. Pengembangan Halaman (MVP)
Kerjakan halaman-halaman berikut dengan UI sederhana menggunakan Tailwind CSS:
- [ ] **HomeView**: 
  - Tampilkan Hero banner sederhana.
  - Tampilkan menu kategori (bisa berupa tombol atau dropdown).
  - Tampilkan grid/list produk. Tiap produk bisa di-klik menuju halaman detail.
- [ ] **ProductDetailView**:
  - Ambil parameter `:id` dari URL.
  - Tampilkan gambar, judul, harga, deskripsi lengkap, rating, dan tombol "Add to Cart".
- [ ] **CartView**:
  - Tampilkan daftar produk di keranjang (gambar, judul, harga, qty).
  - Tombol +/- untuk mengatur qty.
  - Tombol hapus item.
  - Rincian kalkulasi total harga.
  - Tombol Checkout dummy (cukup tampilkan alert JavaScript).

## 7. Out of Scope (Jangan Dikerjakan)
Pastikan hal-hal berikut **TIDAK** dikerjakan untuk MVP ini:
- Fitur Login/Register (Authentication).
- Fitur Checkout/Payment gateway asli.
- Fitur Search bar (karena FakeStore API tidak menyediakannya).
