export const revalidate = 10080;

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, StockLabel } from "@/components";
import { robotoFont } from "@/config/fonts";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";
import { AddToCart } from './ui/AddToCart';
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug
 
  const product = await getProductBySlug(slug);
 
  return {
    title: product?.title ?? 'Product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Product not found',
      description: product?.description ?? '',
      // images: [ `/products/${ product?.images[1] }` ],
    }
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } =  await params;
  
  const product = await getProductBySlug( slug );

  if(!product) notFound(); 

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">

        {/* mobile slideshow */}


        <ProductMobileSlideShow images={ product.images } title={product.title} className="block md:hidden"/>


        <ProductSlideShow images={ product.images } title={product.title} className="hidden md:block"/>
      
      
      </div>

      <div className="col-span-1 px-5 ">
       
        <StockLabel slug={ product.slug } />

        <h1 className={`${robotoFont.className} antialiased font-bold text-xl`}>{product.title}</h1>
       
        <p className="text-lg mb-5">{product.price}</p>


        <AddToCart product={product}/>

        <h3 className="font-bold text-sm">Description</h3>
        
        <p className="font-light">{ product.description }</p>
      </div>





    </div>
  );
}