import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { loadProducts } from "./components/products/allProductsSlice";
import { AppDispatch } from "./store";

import Home from "./pages/Home/Home";
import ProductPage from "./pages/productPage/ProductPage";
import ProductsPage from "./pages/productsPage/ProductsPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import CollectionsPage from "./pages/collectionsPage/CollectionsPage";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar />
      <div id="pageContents">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/products/:category" element={<ProductsPage />} />
          <Route path="/collections/:collection" element={<CollectionsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
