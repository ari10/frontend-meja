# 🖥️ POS Frontend (Vue 3)

## 📌 Overview

Frontend POS berbasis Vue 3 + Tailwind untuk sistem restoran.

---

## 🚀 Features

* Login & Register
* Dashboard Meja (Guest & Admin)
* Order Page (Add Item)
* Send to Kitchen
* Close Order
* History Transaksi
* Print Receipt PDF

---

## 🛠️ Tech Stack

* Vue 3 (Composition API)
* Vue Router
* Pinia
* Axios
* Tailwind CSS

---

## ⚙️ Installation

```bash
git clone https://github.com/ari10/frontend-meja.git
cd pos-frontend

npm install
npm run dev
```

---

## 🔗 API Connection

Edit:

```
src/services/api.js
```

```js
baseURL: "http://127.0.0.1:8000/api"
```

---

## 🔑 Roles

### 👨‍🍳 Pelayan

* Add item
* Send to kitchen

### 💰 Kasir

* Close order
* Print receipt
* View history

---

## 📊 Flow App

```
Guest → Dashboard (lihat meja)
Login kasir/pelayan → Dashboard
→ Order → Send Kitchen
→ Kasir → Close Order
→ History → Print Receipt
```

---

## ✅ Status

✔️ Fully Functional UI
✔️ Connected to Backend API
✔️ Responsive & Clean UI
