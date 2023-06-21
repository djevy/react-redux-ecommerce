import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import Products from "./components/products/Products";
import Search from "./components/search/Search";
import { loadProducts } from "./components/products/allProductsSlice";
import { AppDispatch } from "./store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadProducts() as any);
  }, [dispatch]);
  return (
    <div className="App">
      <h1>Menswear</h1>
      <Search />
      <Products />
    </div>
  );
}

export default App;
