"use client";
import { useEffect, useState } from "react";
import { getPaginatedProductWithImages } from "@/actions";
import { ProductGrid, Title, Pagination } from "@/components";

import { useSearch } from "@/context/SearchContext";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
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
      <Pagination totalPages={totalPages} />
    </>
  );
}
