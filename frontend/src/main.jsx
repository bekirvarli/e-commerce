import "antd/dist/reset.css"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./layouts/Layout.jsx";
import App from "./App.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import CartProvider from "./context/CartProvider.jsx";
//import ReactDOM from "react-dom/client";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <Layout>
        <App />
      </Layout>
    </CartProvider>
  </BrowserRouter>
);
