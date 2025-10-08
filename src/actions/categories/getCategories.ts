'use server';

import prisma from '@/lib/prisma'

export default async function getCategories() {
 
    const categories = await prisma.category.findMany({
        orderBy:{
            name: 'desc'
        }
    })

    return categories;
}
