'use server';

import prisma from "@/lib/prisma";

interface PaginationOptions {
    page?: number;
    take?: number; 
}


export const getPaginatedProductWithImages = async({
    page = 1,
    take = 6
}: PaginationOptions) => {


    if (isNaN(Number(page))) page = 1;
    if( page < 1 ) page = 1;



    try {
        const products = await prisma.product.findMany({
            include: {
                ProductImage: {
                    skip: ( page - 1 ) * take,
                    take: 2,
                    select: {
                        url: true,
                    }
                }
            }
        }
        
    );


    // get total pages
    // todo
    const totalCount = await prisma.product.count({});
    const totalPages = Math.ceil( totalCount / take );

    
    return  { 
                currentPage: page,
                totalPages: totalPages,
                products: products.map( product => ({ 
                ...product, images: product.ProductImage.map( img => img.url )
            } 
        )) 
    };
    
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch products');
    }

}