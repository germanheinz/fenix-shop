export const revalidate = 60;


import { getPaginatedProductWithImages } from '@/actions';
import { ProductGrid } from '../../../../components/products/product-grid/ProductGrid';
import { Pagination, Title } from "@/components";
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    id: string;
  },
  searchParams:{
    page?: string;
  }
}

export default async function CategoryByIdPage({ params, searchParams }: Props) {

  const { id } = params;

  console.log(id);

  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const {products, totalPages } = await getPaginatedProductWithImages({
    page,
    gender: id as Gender
  });

  // if ( id === 'kids' ) { notFound(); }

  if( products.length === 0 ){
    redirect(`/gender/${ id }`);
  }

  const labels: Record<string, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'Unisex'
  }

 
  return (
    <>

      <Title className='mb-2' title={`Items for ${ labels[id] }` } subtitle="test"/>

      <ProductGrid products={ products }/>

      <Pagination totalPages={ totalPages }/>
    </>
  );
}