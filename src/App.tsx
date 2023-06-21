import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { loadProducts } from "./components/products/allProductsSlice";
import { AppDispatch } from "./store";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

import NotFound from "./pages/NotFound";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadProducts() as any);
  }, [dispatch]);
  return (
    <div id="pageContents" className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
