# Comfy Store Clone

A pixel-perfect, fully functional e-commerce application built with Vite, React, and JavaScript.

## 🚀 How to Start/Run

Follow these steps to get the project running locally:

1. **Clone the repository** (if applicable) and navigate to the project folder.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Open your browser**:
   Navigate to the local URL shown in your terminal (usually `http://localhost:5173`).

## 🏗️ Architecture: Frontend & Backend

- **Frontend**: This is a complete, custom-built React application using Redux Toolkit for state management, React Router for navigation, and Tailwind CSS + DaisyUI for styling.
- **Backend**: I have integrated the frontend with a **production-ready external API** (Strapi server).
  - **Endpoint**: `https://strapi-store-server.onrender.com/api`
  - **Features**: All product data, filtering, user authentication, and order creation are handled through this live backend.
  - **Note**: You do not need to run a local backend; the app connects directly to the live server.

## 🛠️ Key Features

- **Store-wide search** and filtering (Categories, Companies, Price Range).
- **User Authentication** (Register, Login, Guest Access).
- **Persistent Cart** (Data remains after page refresh using LocalStorage).
- **Theme Support** (Toggle between Winter and Dracula modes).
- **Responsive Design** (Optimized for Mobile, Tablet, and Desktop).

---

Built with ❤️ by Antigravity
