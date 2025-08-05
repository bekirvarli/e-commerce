
import React from "react";
import HomePage from "./pages/HomePage";
import "./App.css";

import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPages";
import Auth from "./components/Auth/Auth";
import AuthPage from "./pages/AuthPage";
import Cart from "./components/Cart/Cart";
import CartPage from "./pages/CartPage";
import { Route, Routes } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/blog/:id" element={<BlogDetailsPage />} />
    </Routes>
  );
}

export default App;
