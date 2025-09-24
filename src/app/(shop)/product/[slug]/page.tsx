export const revalidate = 10080;

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { geist_Mono } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next/dist/lib/metadata/types/metadata-interface";

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const product = await getProductBySlug(slug);
 
  return {
    title: product?.title ?? 'Product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title,
      description: product?.description ?? '',
      images: [ `/products/${ product?.images[1] }` ],
    }
  }
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } =  await params;
  
  const product = await getProductBySlug( slug );

  if(!product) return; 

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      <div className="col-span-1 md:col-span-2">

        {/* mobile slideshow */}


        <ProductMobileSlideShow images={ product.images } title={product.title} className="block md:hidden"/>


        <ProductSlideShow images={ product.images } title={product.title} className="hidden md:block"/>
      
      
      </div>

      <div className="col-span-1 px-5 ">
       
        <StockLabel slug={ product.slug } />

        <h1 className={`${geist_Mono} antialiased font-bold text-xl`}>{product?.title}</h1>
       
        <p className="text-lg mb-5">{product?.price}</p>


        {/* selector tallas */}

        <SizeSelector 
          selectedSize   = { product.sizes[0] } 
          availableSizes = { product.sizes    } 
        />
        
        <QuantitySelector quantity={1}/>

        <button className="btn-primary my-5">Add to Cart</button>

        <h3 className="font-bold text-sm">Description</h3>
        
        <p className="font-light">{ product?.description }</p>
      </div>





    </div>
  );
}