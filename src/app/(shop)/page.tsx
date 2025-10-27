"use client";
import { useEffect, useState, Suspense } from "react";
import { getPaginatedProductWithImages } from "@/actions";
import { ProductGrid, Title, Pagination } from "@/components";
import { Product } from "@/interfaces";
import { useSearch } from "@/context/SearchContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const { searchResults } = useSearch();

  useEffect(() => {
    (async () => {
      const { products, totalPages } = await getPaginatedProductWithImages({ page: 1 });
      setProducts(products);
      setTotalPages(totalPages);

      // Register visit if cookie is not set
      if (!document.cookie.includes('visited=1')) {
        try {
          await fetch('/api/visits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ref: new URLSearchParams(window.location.search).get('ref') || '',
            }),
          });
        } catch (error) {
          console.error('Error registering visit:', error);
        }
      }
    })();
  }, []);

  return (
    <>
      <Title title="Store" subtitle="All Products" className="mb-2" />
      <ProductGrid products={searchResults.length > 0 ? searchResults : products} />
      <Suspense fallback={<div>Loading pagination...</div>}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </>
  );
}
