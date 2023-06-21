import { urlFor } from "../../client";

function Product({product: { image, name, slug, price }}: any) {
  // console.log(product);
  return (
    <div>
      <p>{name}</p>
      {image.length > 0 &&
        <img
          src={urlFor(image && image[0])?.url()}
          alt={name}
          className="product-image"
          loading="lazy"
        />
      }
    </div>
  );
}

export default Product;
