'use server';

import prisma from "@/lib/prisma";

export const findProductsBySlug = async( slug: string ) => {
  
  try{
    const product = await prisma.product.findMany({
        include: {
            ProductImage: true
        },
        where: { 
            slug: slug,
        }
    })
    console.log(product);
    
    if(!product) return null;


    return { 
        product,
        images: product[0].ProductImage.map( img => img.url )
    }



  }catch( error ){
    console.log({ error });
    throw new Error('Error to find products');
  }
  
}