# Issue: Implementasi Halaman Home (MVP)

## Deskripsi
Tugas ini bertujuan untuk mengimplementasikan tampilan Halaman Home untuk aplikasi e-commerce MVP berdasarkan referensi desain (gambar) dan panduan *styling* dari `design.md`. Halaman ini akan menjadi halaman utama (landing page) yang menampilkan navigasi, banner promosi, filter kategori, dan daftar produk dengan desain "Modern Clean".

## Referensi
- Gambar referensi UI (tangkapan layar Halaman Home).
- File panduan desain: `design.md`.

## Daftar Tugas (Tahapan Implementasi)

### 1. Pembuatan Komponen Dasar (UI Components)
Buat komponen-komponen UI modular yang dapat digunakan ulang di direktori `components`:

- [ ] **`components/layout/Header.vue`**:
  - Logo "LuxeStore" di sebelah kiri dengan teks berwarna primary (`#7047EB`).
  - Navigasi di tengah: "Home" (dengan *active state* garis bawah/teks primary), "Search", "Orders", "Profile".
  - Ikon keranjang belanja (*Cart*) di sebelah kanan.
  - Layout *sticky* di atas dengan background putih dan sedikit *backdrop-blur*.
- [ ] **`components/home/HeroBanner.vue`**:
  - *Container* lebar dengan sudut sangat membulat (`rounded-3xl`).
  - Latar belakang gradien (ungu ke pink halus).
  - Teks *headline* "Find Your Style, Love Your Look" dan subteks deskripsi.
  - Tombol CTA "Shop Now" berbentuk kapsul (`rounded-full`) dengan background putih dan teks primary.
- [ ] **`components/home/CategoryFilter.vue`**:
  - Baris kumpulan tombol kategori berbentuk kapsul/pil (`rounded-full`).
  - *Active state* (contoh: "All"): Background warna primary (`#7047EB`) dan teks putih.
  - *Inactive state*: Background transparan/putih, dengan border tipis dan teks abu-abu/hitam.
- [ ] **`components/product/ProductCard.vue`**:
  - Kartu produk berlatar putih dengan `rounded-2xl` dan *shadow* sangat halus (`shadow-sm` / custom).
  - Area gambar produk di bagian atas (tinggi *fixed* misalnya `h-48`, dengan `object-contain`).
  - Dukungan untuk menampilkan *Badge* (contoh: "New" pink, "-15%" oranye/merah) di sudut kiri atas gambar.
  - Detail produk: Judul (maksimal 2 baris / `line-clamp-2`), rating (bintang emas + angka), dan harga produk.
  - Tombol aksi bulat dengan ikon "+" di sudut kanan bawah (`bg-[#7047EB] text-white p-2 rounded-full`).
- [ ] **`components/product/ProductCardSkeleton.vue`**:
  - Komponen untuk menampilkan status *loading* dari produk.
  - Gunakan animasi `animate-pulse` dengan blok-blok berwarna abu-abu terang menyimulasikan gambar, judul, harga, dan tombol.

### 2. Konstruksi Halaman Home (`views/HomeView.vue`)
Susun komponen-komponen yang telah dibuat ke dalam layout utama Halaman Home:

- [ ] Gunakan *container* utama dengan batas lebar maksimal (misal: `max-w-7xl mx-auto px-4 sm:px-6`) agar konten terpusat.
- [ ] Panggil komponen `Header.vue` di posisi paling atas.
- [ ] Panggil komponen `HeroBanner.vue` tepat di bawah header dengan jarak/margin yang sesuai.
- [ ] Panggil komponen `CategoryFilter.vue` dengan daftar kategori: "All", "New Arrivals", "Accessories", "Outerwear", "Footwear".
- [ ] **Bagian "Trending Now"**:
  - Tambahkan judul seksi "Trending Now" di kiri dan link teks "View All" di kanan.
  - Buat grid responsif (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`).
  - Render komponen `ProductCard` dengan *mock data* statis sementara untuk menyimulasikan: Tas Minimalist Leather, Kacamata Classic Aviator, Jam Tangan Rose Gold Smart Watch, dan Sepatu Sneakers Putih. (Terapkan *badge* dan diskon pada item yang sesuai).
- [ ] **Bagian "Recommended for You"**:
  - Tambahkan judul seksi "Recommended for You".
  - Gunakan layout grid yang sama dengan "Trending Now".
  - Render komponen `ProductCardSkeleton` sebanyak 4 buah untuk mendemonstrasikan status memuat data (sesuai referensi UI bawah).

### 3. Penyesuaian Desain & Polesan Akhir
Mengacu ketat pada `design.md`:
- [ ] Pastikan warna latar belakang utama halaman adalah abu-abu sangat terang (contoh: `#F8F9FB` / `bg-slate-50`) agar kartu produk berwarna putih terlihat jelas (*pop out*).
- [ ] Pastikan keluarga font modern *sans-serif* (Inter/Poppins) telah terpasang dan digunakan.
- [ ] Uji tingkat responsivitas (*Mobile-First*): Pastikan susunan grid pada mobile menjadi 1 kolom (`grid-cols-1`), tablet 2 kolom (`grid-cols-2`), dan desktop 4 kolom (`grid-cols-4`).

## Kriteria Penerimaan (Acceptance Criteria)
- [ ] File komponen (`Header.vue`, `HeroBanner.vue`, `ProductCard.vue`, dll.) dan view utama (`HomeView.vue`) berhasil dibuat.
- [ ] Tidak ada error saat menjalankan `npm run dev`.
- [ ] Halaman dirender dengan sempurna di browser dan secara visual sesuai dengan gambar referensi.
- [ ] Status *loading* berupa *skeleton* tampil dengan animasi di bagian rekomendasi.
- [ ] Komponen bersifat adaptif dan responsif terhadap perubahan ukuran layar browser.
