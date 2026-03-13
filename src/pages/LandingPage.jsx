import { useEffect, useRef, useState } from "react";
import { customFetch } from "../api";
import { Link, useLoaderData } from "react-router-dom";

import ProductsGrid from "../components/ProductsGrid";
import SectionTitle from "../components/SectionTitle";

import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const carouselImages = [hero1, hero2, hero3, hero4];
const url = "/products?featured=true";

export const loader = async () => {
  const response = await customFetch(url);
  const products = response.data.data;
  return { products };
};

const LandingPage = () => {
  const { products } = useLoaderData();

  //  state + ref for auto-scrolling
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % carouselImages.length;
        const item = container.children[next];

        if (item) {
          container.scrollTo({
            left: item.offsetLeft - container.offsetLeft,
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
            We are changing the way people shop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <div className="mt-10">
            <Link to="/products" className="btn btn-primary">
              OUR PRODUCTS
            </Link>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box"
        >
          {carouselImages.map((image) => {
            return (
              <div key={image} className="carousel-item">
                <img
                  src={image}
                  className="rounded-box h-full w-80 object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-24">
        <SectionTitle title="featured products" />
        <ProductsGrid products={products} />
      </div>
    </>
  );
};

export default LandingPage;