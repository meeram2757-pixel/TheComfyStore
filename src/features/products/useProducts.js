import { useLoaderData } from "react-router-dom";

const useProducts = () => {
  const { products } = useLoaderData();
  return products;
};

export default useProducts;

