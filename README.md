# 🍽️ Resto App - Frontend

Frontend aplikasi manajemen restoran yang dibangun menggunakan Vue 3.
Berfungsi sebagai client untuk mengakses API backend (Laravel).

---

## 🚀 Features (Current Progress)

* Authentication UI

  * Login
  * Register (multi role: pelayan, kasir)
* Token handling (localStorage)
* Protected route (dashboard)
* Basic dashboard page

---

## 🛠️ Tech Stack

* Vue 3 (Composition API)
* Vue Router
* Pinia (State Management)
* Axios (HTTP Client)
* Tailwind CSS (UI Styling)

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/ari10/frontend-meja.git
cd frontend-repo
```

---

### 2. Install Dependency

```bash
npm install
```

---

### 3. Run Project

```bash
npm run dev
```

Aplikasi akan berjalan di:

```bash
http://localhost:5173
```

---

## 🔑 Configuration

Pastikan backend berjalan di:

```bash
http://127.0.0.1:8000
```

Edit file:

```bash
src/services/api.js
```

```js
baseURL: "http://127.0.0.1:8000/api"
```

---

## 🔐 Authentication Flow

* User login → token disimpan di localStorage
* Token digunakan untuk request API
* Route dashboard hanya bisa diakses jika sudah login
* Logout akan menghapus token

---

## 📦 Pages

* `/` → Login
* `/register` → Register
* `/dashboard` → Dashboard (protected)

---

## 📌 Notes

* Backend harus sudah berjalan sebelum frontend digunakan
* Menggunakan token-based authentication (Laravel Sanctum)
* Role user akan digunakan di tahap selanjutnya

---

## 🚀 Next Development

* Dashboard Meja (Table List)
* Status Meja (Available / Occupied)
* CRUD Makanan
* Order Management
* UI Improvement
