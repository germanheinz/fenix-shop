'use server';
import prisma  from "@/lib/prisma";

export const findProductsBySlug = async( slug: string ) => {
  
  try{
    const products = await prisma.product.findMany({
      include: {
        ProductImage: true
      },
      where: {
        description: {
          contains: slug,
          mode: 'insensitive'
        }
      },
      take: 5
    });

    console.log('Productos encontrados:', products.length);

    if (products.length === 0) return null;

    return products.map(product => ({
      ...product,
      images: product.ProductImage ? product.ProductImage.map(img => img.url) : []
    }));



  }catch( error ){
    console.log({ error });
    throw new Error('Error to find products');
  
}
  
}