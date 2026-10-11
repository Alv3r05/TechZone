import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Hero from "../features/home/components/Hero";
import CategorySection from "../features/home/components/CategorySection";
import ProductGrid from "../features/products/components/ProductGrid";
import Footer from "../components/layout/Footer";

import { getProducts } from "../features/products/services/productService";
import type { Product } from "../types/product";

const Home = (): React.ReactElement => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    void loadProducts();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <CategorySection />

        <ProductGrid products={products} loading={loading} error={error} />
      </main>

      <Footer />
    </>
  );
};

export default Home;
