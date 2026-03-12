import { customFetch } from "../api";
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import ProductsGrid from "../components/ProductsGrid";
import ProductsList from "../components/ProductsList";
import Filters from "../features/filters/FilterPanel";
import { PaginationContainer } from "../components";

const url = "/products";


export const loader = async () => {
  const response = await customFetch(url);
  let allProducts = [...response.data.data];
  const { pageCount } = response.data.meta.pagination;

  if (pageCount > 1) {
    const promises = [];
    for (let i = 2; i <= pageCount; i++) {
      promises.push(customFetch(`${url}?page=${i}`));
    }
    const responses = await Promise.all(promises);
    responses.forEach((res) => {
      allProducts = [...allProducts, ...res.data.data];
    });
  }

  return { products: allProducts, meta: response.data.meta };
};

const Products = () => {
  const { products, meta } = useLoaderData();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [layout, setLayout] = useState("grid");


  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    company: 'all',
    order: 'a-z',
    price: 100000,
    shipping: false,
  });

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  useEffect(() => {
    let visibleProducts = [...products];

    if (filters.search) {
      visibleProducts = visibleProducts.filter((item) =>
        item.attributes.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      visibleProducts = visibleProducts.filter((item) => 
        item.attributes.category === filters.category
      );
    }

    if (filters.company !== 'all') {
      visibleProducts = visibleProducts.filter((item) => 
        item.attributes.company === filters.company
      );
    }

    if (filters.shipping) {
      visibleProducts = visibleProducts.filter((item) => 
        item.attributes.shipping);
    }

    visibleProducts = visibleProducts.filter((item) => 
        item.attributes.price <= filters.price
    );

    if (filters.order === 'a-z') {
      visibleProducts.sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      );
    }
    if (filters.order === 'z-a') {
      visibleProducts.sort((a, b) =>
        b.attributes.title.localeCompare(a.attributes.title)
      );
    }
    if (filters.order === 'high') {
      visibleProducts.sort((a, b) => b.attributes.price - a.attributes.price);
    }
    if (filters.order === 'low') {
      visibleProducts.sort((a, b) => a.attributes.price - b.attributes.price);
    }

    setFilteredProducts(visibleProducts);
  }, [filters, products]);

  const pageCount = Math.ceil(filteredProducts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <Filters filters={filters} applyFilters={applyFilters} meta={meta} />

      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {filteredProducts.length} product{filteredProducts.length > 1 && "s"}
        </h4>
        <div className="flex gap-x-2">
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={layout === "grid" ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={() => setLayout("list")}
            className={layout === "list" ? "btn btn-primary btn-sm" : "btn btn-ghost btn-sm"}
          >
            <BsList />
          </button>
        </div>
      </div>

      
      {/* <ProductsGrid /> */}
      {/* <ProductsList /> */}

      {/* conditional using layout and paginatedProducts */}
      {filteredProducts.length === 0 ? (
        <h5 className="text-2xl mt-16">
          Sorry, no products matched your search...
        </h5>
      ) : layout === "grid" ? (
        <ProductsGrid products={paginatedProducts} />
      ) : (
        <ProductsList products={paginatedProducts} />
      )}

      <PaginationContainer
        pageCount={pageCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default Products;