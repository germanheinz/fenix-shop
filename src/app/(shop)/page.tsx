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
