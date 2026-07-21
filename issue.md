# Implementasi Halaman Profil Pengguna

Tugas ini bertujuan untuk merancang dan membangun halaman Profile pengguna dengan menyimulasikan state login menggunakan data dari Fake Store API. Tetap gunakan `design.md` sebagai acuan styling utama (sudut membulat, bayangan halus, warna latar belakang `bg-slate-50`).

## 1. Data Fetching & Loading State
- Lakukan proses fetch data pengguna ke endpoint: `https://fakestoreapi.com/users/1`
- **Wajib:** Buatkan **Skeleton Loader** (animasi pulse abu-abu, misal menggunakan class `animate-pulse` dan `bg-gray-200`) untuk area Header Profil dan bagian lain selagi data sedang dimuat.

## 2. User Header Card (Profile Info)
Buat card berwarna putih di bagian atas halaman dengan spesifikasi berikut:
- **Styling Card:** Gunakan class `bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center gap-6`.
- **Avatar:**
  - Karena API tidak menyediakan foto, gunakan tag `<img>` yang digenerate otomatis dari UI Avatars API.
  - URL format: `https://ui-avatars.com/api/?name=[firstname]+[lastname]&background=7047EB&color=fff` (ini akan menghasilkan avatar inisial dengan warna ungu utama proyek kita).
  - Styling Avatar: Buat bentuk bundar dengan menambahkan class `rounded-full w-24 h-24`.
- **Info Teks:**
  - Tampilkan nama lengkap dengan menggabungkan `name.firstname` dan `name.lastname`.
  - Gunakan CSS `capitalize` agar huruf pertama pada setiap kata menjadi kapital.
  - Di bawah nama, tampilkan informasi `email` dan `phone` yang didapat dari data API. Berikan warna teks abu-abu (`text-gray-500`) untuk informasi ini.

## 3. Address Card (Informasi Alamat)
Buat card kedua di bawah User Header Card untuk menampilkan alamat.
- Berikan judul kecil: **"Default Shipping Address"** (misal dengan styling `text-lg font-semibold mb-3`).
- Tampilkan data alamat pengguna: `address.street`, `address.number`, `address.city`, dan `address.zipcode`.
- Susun data alamat tersebut dalam format paragraf yang rapi dan mudah dibaca oleh pengguna.

## 4. Menu List Card
Buat card ketiga di bawahnya untuk daftar menu pengaturan statis.
- Buat baris menu (list item) yang bisa di-hover untuk memberikan feedback interaktif.
- Daftar menu yang harus dibuat:
  - **"My Orders"** (harus mengarahkan pengguna ke `/orders`)
  - **"Payment Methods"**
  - **"Notifications"**
- **Ikonografi:** Letakkan ikon yang relevan dengan warna abu-abu di sisi kiri, dan ikon panah `chevron-right` di sisi kanan untuk tiap baris menu.

## 5. Logout Button
Di bagian paling bawah halaman profil, buat tombol "Log Out".
- **Styling Tombol:** Buat tombol yang mengisi lebar penuh (full-width) dengan teks merah dan background abu-abu kemerahan.
- Gunakan class: `w-full py-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl font-semibold`.
