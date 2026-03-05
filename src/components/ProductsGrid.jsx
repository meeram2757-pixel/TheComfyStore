import { Link } from "react-router-dom";
import useProducts from "../features/products/useProducts";
import ProductCard from "../features/products/ProductCard";

const ProductsGrid = () => {
  const products = useProducts();

  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        const dollarsAmount = (price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
        return (
          <ProductCard key={product.id}>
            <Link
              to={`/products/${product.id}`}
              className="card w-full shadow-xl hover:shadow-2xl transition duration-300"
            >
              <figure className="px-4 pt-4">
                <img
                  src={image}
                  alt={title}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title capitalize tracking-wider">
                  {title}
                </h2>
                <span className="text-secondary">{dollarsAmount}</span>
              </div>
            </Link>
          </ProductCard>
        );
      })}
    </div>
  );
};
export default ProductsGrid;
