# OpuraAI

**OpuraAI** is a modern, AI-powered e-commerce search and comparison assistant. It provides users with an intuitive chat-like interface to discover products, read smart AI-generated comparisons, and manage their shopping cart and wishlist seamlessly.

🚀 **Live Demo:** [https://opuraai.netlify.app/](https://opuraai.netlify.app/)

## ✨ Key Features

- **Conversational AI Search:** Describe what you are looking for in natural language, and OpuraAI will fetch the most relevant products and respond to you directly.
- **Smart AI Comparisons:** Select up to 3 products and have the AI generate a detailed, side-by-side comparison highlighting the "Winner", "Best Value", Pros, and Cons.
- **Wishlist Management:** Save your favorite products for later with a single click.
- **Cart System:** Add products to your cart, manage quantities, and view a dynamic order summary including taxes.
- **Modern UI:** Built with Tailwind CSS, featuring smooth micro-animations, glassmorphism, and responsive layouts.

## 🛠️ Technology Stack

- **Frontend Framework:** React (with Vite)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Icons:** Custom SVG Icon library

## ⚙️ How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:5173/` (or the port specified by Vite in your terminal).

## 🗂️ Project Structure

- `src/components/`: Reusable UI components (Product Cards, SideBar, MainBar, Icons).
- `src/Pages/`: Main application views (MainPage, ComparePage, CartPage, WishlistPage).
- `src/Redux/`: Global state management slices (Products, Compare, Cart, Wishlist).
- `src/App.tsx`: Main routing configuration.
