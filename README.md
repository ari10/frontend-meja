# 🍽️ Resto App - Frontend

Frontend aplikasi manajemen restoran menggunakan Vue 3.

---

## 🚀 Features

### 🔐 Authentication

* Login
* Register
* Role-based (kasir & pelayan)

### 🪑 Dashboard Meja

* Menampilkan daftar meja
* Status meja (available / occupied)
* Klik meja untuk membuka order

### 🍔 Order System

* Menampilkan menu makanan
* Tambah item ke pesanan
* Menampilkan detail pesanan
* Hitung total otomatis
* Close order (selesaikan pesanan)

---

## 🛠️ Tech Stack

* Vue 3 (Composition API)
* Vue Router
* Axios
* Tailwind CSS

---

## ⚙️ Installation

```bash
git clone https://github.com/ari10/frontend-meja.git
cd frontend-repo
npm install
```

---

## ▶️ Run App

```bash
npm run dev
```

---

## 🔗 API Connection

Pastikan backend berjalan di:

```bash
http://127.0.0.1:8000
```

Dan konfigurasi di:

```bash
src/services/api.js
```

---

## 📌 Notes

* Menggunakan token authentication (Bearer Token)
* Data diambil dari backend Laravel API
* UI dibuat sederhana namun fokus pada fungsionalitas
