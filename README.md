# 🏡 Regal Estate

Welcome to Regal Estate, a comprehensive real estate marketplace built using the MERN stack (MongoDB, Express, Node.js, React) with additional tools like Tailwind CSS, TypeScript, Zod, JWT, bcryptjs, and Firebase.

## ✨ Features

### Homepage:

- Image slider
- Property listings (For Sale, For Rent, On Offer)
- Search bar with advanced filters (Rent, Sale, Offer, Parking, Furnished)
- Sorting options (Price, Date)

### Property Details:

- Image gallery
- Property details (Name, Address, Description, Price, Features like Bedrooms, Bathrooms, Parking, Furnished)
- Contact landlord feature

### User Authentication:

- Sign in with Username/Password or Google
- Sign up with Username/Email/Password or Google

### User Profile:

- Edit profile (Username, Email, Password, Profile Picture)

### Property Management:

- Admin can create and edit property listings

### About Page:

- Information about the company

### Security:

- JWT for authentication tokens
- Password encryption using bcryptjs

## 🛠️ Tech Stack

- Backend - `Node.js` `Express` `Zod` `JWT` `MongoDB` `Typescript` `Firebase` `bcryptjs`

- Frontend - `React.js` `Vite` `Tailwind CSS`

#### Deployment:

- Frontend - `Vercel`
- Backend - `Render`

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js
- MongoDB
- Firebase account for authentication

### Setup Instructions

#### Clone the repository:

  ```
      git clone https://github.com/tanishkadeep/Regal-Estate.git
      cd regal-estate
  ```

#### Backend Setup

1. Navigate to the backend directory & install dependencies:

   ```bash
   cd api
   npm install
   ```

2. Create a .env file:

   ```
   MONGO=your_mongodb_connection_url
   JWT_SECRET_KEY=your_jwt_secret_key
   ```

3. Start the backend server:

   ```
   npm run dev
   ```

#### Frontend Setup

1. Navigate to the frontend directory & install dependencies:

   ```
   cd client
   npm install
   ```

2. Create a .env file:

   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   ```

3. Start the frontend server:

   ```
   npm run dev
   ```

---

📬 Thank you for checking out RegalEstate! If you have any questions or feedback, feel free to open an issue or contact me at tanishkadeep09@gmail.com

---
