export const revalidate = 60;

import { getPaginatedProductWithImages } from "@/actions";
import { ProductGrid, Title, Pagination } from "@/components";
import { redirect } from "next/navigation";


export default async function Home() {


  const { products, currentPage, totalPages } = await getPaginatedProductWithImages({ page: 1, take: 12 });




  if( products.length === 0 ){
    redirect('/');
  }

  return (
      <>
        <Title title="Store" subtitle="All Products" className="mb-2"/>

        <ProductGrid products={ products }/>

        <Pagination totalPages={ totalPages }/>
      </>
  );
}
