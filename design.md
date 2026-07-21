# Design System & UI Guidelines: NovaShop (Vue E-Commerce)

**Document Purpose:** 
Panduan ini berfungsi sebagai *Single Source of Truth* (SSOT) untuk desain UI/UX proyek e-commerce MVP. Semua pengembangan komponen harus mengacu pada dokumen ini untuk memastikan konsistensi visual di seluruh halaman aplikasi, mengadaptasi gaya desain "Modern Clean" dengan aksen ungu.

---

## 1. Visual Language & Token (Tailwind CSS Mapping)

### 1.1. Color Palette
Desain ini menggunakan skema warna yang bersih dengan aksen ungu yang *vibrant* untuk interaksi utama.

*   **Primary (Brand & Action):** `#7047EB` (Gunakan Tailwind: `bg-[#7047EB]`, `text-[#7047EB]`) - Untuk tombol utama, active state, dan elemen *highlight*.
*   **Background:** `#F8F9FB` (Gunakan Tailwind: `bg-slate-50` atau `bg-gray-50`) - Warna latar belakang utama aplikasi agar *card* putih bisa menonjol.
*   **Surface / Card:** `#FFFFFF` (Gunakan Tailwind: `bg-white`)
*   **Text Primary:** `#1C1C28` (Gunakan Tailwind: `text-gray-900`) - Untuk judul dan teks penting.
*   **Text Secondary:** `#8F90A6` (Gunakan Tailwind: `text-gray-500`) - Untuk deskripsi, kategori, dan placeholder.
*   **Accent (Sale/Alert):** `#FF6B6B` (Gunakan Tailwind: `bg-red-500` / `text-red-500`) - Untuk badge diskon atau peringatan.

### 1.2. Typography
Gunakan font sans-serif modern yang *clean* dan geometris.
*   **Font Family:** `Inter`, `Poppins`, atau `Plus Jakarta Sans`. (Gunakan `font-sans` dengan konfigurasi font Google di Tailwind).
*   **Heading 1 (Hero):** `text-4xl font-bold leading-tight`
*   **Heading 2 (Section Title):** `text-xl font-semibold`
*   **Body Text:** `text-sm font-normal` atau `text-base`
*   **Price:** `text-lg font-bold text-gray-900`

### 1.3. Shape & Shadows (Glassmorphism / Soft UI)
Desain ini mengandalkan sudut yang membulat (rounded) dan bayangan yang sangat lembut.
*   **Border Radius:** 
    *   Cards / Hero Banner: `rounded-2xl` atau `rounded-3xl`
    *   Buttons: `rounded-full` (Pill shape)
    *   Images: `rounded-xl`
*   **Shadows:**
    *   Default Card: `shadow-sm` atau bayangan custom yang sangat halus `shadow-[0_4px_20px_rgba(0,0,0,0.03)]`.
    *   Hover State: `hover:shadow-md transition-shadow duration-300`.

---

## 2. Layout Structure (MVP Adaptation)

Meskipun referensi menggunakan *sidebar* kompleks, untuk MVP FakeStore API ini kita akan mengadaptasi layout agar lebih fokus pada *Product Discovery*:

*   **Top Navigation (Header):** 
    *   Logo di kiri, Search Bar (dummy/opsional) di tengah, dan ikon Cart (dengan *badge* jumlah barang) di kanan. 
    *   Header ini harus *sticky* di atas dengan latar putih dan sedikit transparansi (backdrop-blur).
*   **Main Content (Container):** 
    *   Gunakan `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` untuk menahan konten agar tidak terlalu melebar di layar besar.
*   **Cart (Sidebar/Drawer):** 
    *   Alih-alih halaman terpisah, *Cart* diimplementasikan sebagai *Slide-over Drawer* yang muncul dari kanan layar saat ikon Cart diklik. Ini meniru layout "My Cart" pada referensi desain.

---

## 3. Component Specifications

### 3.1. Hero Banner
*   **Bentuk:** Kotak lebar dengan sudut `rounded-3xl`.
*   **Background:** Gradien ungu ke pink lembut, atau warna solid pastel dengan ilustrasi/gambar di sisi kanan.
*   **Konten:** Teks "Find Your Style, Love Your Look" di kiri, dengan tombol CTA "Shop Now" (putih, teks ungu, `rounded-full`).

### 3.2. Product Card
Komponen inti untuk halaman `/` (Home).
*   **Container:** `bg-white p-4 rounded-2xl flex flex-col h-full relative`.
*   **Image Area:** Tinggi *fixed* (misal: `h-48`), gambar produk di-center menggunakan `object-contain` dan padding agar tidak menabrak tepi.
*   **Badge (Opsional):** Jika ada diskon (dummy), letakkan di pojok kiri atas gambar (`absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg`).
*   **Content:**
    *   Judul Produk: Maksimal 2 baris (gunakan `line-clamp-2`), `text-sm font-medium mt-4`.
    *   Harga: `text-lg font-bold mt-2`.
    *   Rating: Ikon bintang kuning + angka rating di bawah harga.
*   **Action:** Tombol Cart bulat (Icon Cart) di pojok kanan bawah, berwarna ungu `bg-[#7047EB] text-white p-2 rounded-full`.

### 3.3. Cart Item (Inside Drawer)
*   **Layout:** Row horizontal (`flex row`).
*   **Image:** Thumbnail kecil di kiri (`w-16 h-16 bg-gray-50 rounded-lg p-1 object-contain`).
*   **Details:** Nama produk (di-truncate), harga.
*   **Stepper (Quantity):** Kontrol + / - sederhana dengan angka di tengah.
*   **Delete:** Ikon trash bin kecil di pojok kanan item.

---

## 4. Development Principles for Stitch

1.  **Mobile-First:** Selalu mulai styling dari layar terkecil (`< 640px`), lalu gunakan modifier `md:`, `lg:` untuk layar besar.
2.  **Component Driven:** Ekstrak elemen berulang menjadi komponen Vue (contoh: `ProductCard.vue`, `BaseButton.vue`) agar desain konsisten dan mudah di-maintain.
3.  **Loading States:** Gunakan *Skeleton Loader* (kotak abu-abu animasi pulse) saat fetching data FakeStore API, jangan hanya teks "Loading...".
