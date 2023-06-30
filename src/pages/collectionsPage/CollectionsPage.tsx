import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { selectProductsByCollection } from "../../components/products/allProductsSlice";
import Products from "../../components/products/Products";

const CollectionsPage = () => {
  const { collection } = useParams();
  const products = useSelector(
    useMemo(() => selectProductsByCollection(collection || ""), [collection])
  );
  let title;
  if (collection) {
    title = collection?.charAt(0).toUpperCase() + collection?.slice(1);
  }

  return (
    <div>
      <Products props={products} title={title || ""} />
    </div>
  );
};

export default CollectionsPage;
