export const revalidate = 60;

import { getPaginatedProductWithImages } from "@/actions";
import { ProductGrid, Title, Pagination } from "@/components";
import { redirect } from "next/navigation";


interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Home({searchParams}: Props) {

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductWithImages({ page });


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
