# 🛒 Grocery MERN Stack E-commerce App

A full-stack application for browsing, ordering, and managing grocery products,  
featuring separate customer and seller interfaces.  
Built using the **MERN stack** with a focus on secure authentication and proper data handling.

---

## 🌐 Live Demo

👉 https://greencart-frontend-anjali-01.s3-website.us-east-2.amazonaws.com/
👉 https://grocery-mern-app-ten.vercel.app/

---

## ✨ Key Features

- 🧩 **Technology Stack:** React (Frontend) + Node.js / Express.js (Backend)
- 🗄️ **Database:** MongoDB for data persistence
- 👤 **Customer Workflow:** Users can create an account, browse products, and place orders
- 🛍️ **Seller Workflow:** Dedicated seller dashboard to add products (instantly visible to customers)
- 🔐 **Authentication:** Secure login system for both customer and seller/admin
- ⚡ Real-time product visibility after seller adds items

---

## 🛠️ Tech Stack

| Category   | Technology |
|------------|------------|
| Frontend   | React, Prebuilt UI |
| Backend    | Node.js, Express.js |
| Database   | MongoDB |

---

## 🔐 Demo Credentials

| Role          | User ID (Email)       | Password    |
|---------------|-----------------------|------------|
| Customer      | dummy@gmail.com       | 12345    |
| Seller/Admin  | admin@gmail.com       | 123456  |

---

## 🚀 Getting Started

### 📌 Prerequisites

- Node.js (LTS recommended)
- MongoDB (Local instance or MongoDB Atlas)
- Git

---

### i️⃣ Clone the repository

```bash
git clone [YOUR_REPOSITORY_URL]
cd "Grocery App"
```

---

### ii️⃣ Install Dependencies

#### Install server dependencies:

```bash
cd server
npm install
```

#### Install client dependencies:

```bash
cd ../client
npm install
```

---

## ⚙️ Configuration

Create a `.env` file inside the server folder:

```env
# Database Connection
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-name>/grocery-db"

PORT=4000

# Authentication Secret
JWT_SECRET="YOUR_SECURE_SECRET_KEY"

# Seller Credentials (Used for auth logic)
SELLER_EMAIL=admin@gmail.com
SELLER_PASSWORD=123456

# CLOUDINARY and other environment variables
```

---

## ▶️ How to Run

```bash
npm run dev
```

The application will open in your browser at:

```
http://localhost:5173
```

---

## 🛍️ Workflow Guide

### ➕ Adding Products (Seller Workflow)

1. Log in as Seller (admin@gmail.com).
2. Navigate to the **Add Product** section.
3. Add product details.
4. The product is immediately visible on the customer frontend page.

---

### 📦 Viewing Orders

- **Customer:** Orders placed appear on the **My Orders** page.
- **Seller:** Orders containing products added by you appear on the **Orders** page in the seller dashboard.

---

## 🌍 Deployment

- **Frontend:** Hosted on AWS S3 Static Hosting  
- **Backend:** (Add your backend hosting platform here — e.g., Render / AWS EC2)

---

## 👩‍💻 Author

**Anjali Singh**  
MERN Stack Developer  

If you like this project, consider giving it a ⭐ on GitHub!
