"use client";
import { useEffect, useState, Suspense } from "react";
import { getPaginatedProductWithImages } from "@/actions";
import { registerVisit } from "@/actions/visit/register-visit";
import { ProductGrid, Title, Pagination } from "@/components";
import { Product } from "@/interfaces";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    (async () => {
      const { products, totalPages } = await getPaginatedProductWithImages({ page: 1 });
      setProducts(products);
      setTotalPages(totalPages);

      try {
        const ref = new URLSearchParams(window.location.search).get('ref') || '';
        await registerVisit({ ref });
      } catch (error) {
        console.error('Error registering visit:', error);
      }
    })();
  }, []);

  return (
    <>
      <Title title="Store" subtitle="All Products" className="mb-2" />
      <ProductGrid products={products} />
      <Suspense fallback={<div>Loading pagination...</div>}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </>
  );
}
