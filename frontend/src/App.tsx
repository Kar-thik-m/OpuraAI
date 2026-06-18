import MainPage from "./Pages/MainPage";
import ComparePage from "./Pages/ComparePage";
import CartPage from "./Pages/CartPage";
import WishlistPage from "./Pages/WishlistPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
