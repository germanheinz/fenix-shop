import { Category, initialData } from "@/seed/seed";
import { ProductGrid } from '../../../../components/products/product-grid/ProductGrid';
import { Title } from "@/components";

interface Props {
  params: {
    id: string;
  }
}

const products = initialData.products;

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default function({ params }: Props) {

  const { id } = params;

  // if ( id === 'kids' ) { notFound(); }

  const product = products.filter( product => ( product.gender == id ))

  const labels: Record<Category, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'Unisex'
  }

 
  return (
    <>

      <Title className='mb-2' title={`Items for ${ labels[id as Category] }` } subtitle="test"/>

      <ProductGrid products={ product }/>
    </>
  );
}