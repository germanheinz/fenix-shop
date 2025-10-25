'use server';

import { Size } from '@/seed/seed';
import { Address } from '../../interfaces/address.interface';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
    
}

export const placeOrder = async( productId: ProductToOrder[], address: Address) => {
    
    const session = await auth();

    const userId = session?.user.id;

    if( !userId ){
        return { 
            ok: false,
            messsage: 'No User Session'
        }
    }

    // GET PRODUCT INFO, SAME PRODUCT ID COULD BE ORDER WITH DIFFERENT SIZE
    const products = await prisma.product.findMany({
        where:{
            id: {
                in: productId.map(p => p.productId)
            }
        }
    })
    
    const itemsInOrder = productId.reduce(( count, product ) => count + product.quantity ,0)
    
    // GET TOTAL, SUBTOTAL, TAX
    const {subTotal, tax, total } = productId.reduce(( totals, item ) => {
        
        const productQuantity = item.quantity;

        const product = products.find(product => product.id === item.productId)        

        if( !product ) throw new Error(`${ item.productId } it does not exist - 500`);

        const subTotal =  product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;


        return totals  ;

    }, { subTotal: 0, tax: 0 , total: 0})

    // CREATE TRANSACTION

    try {

        const prismaTx = await prisma.$transaction( async( tx ) => {

            // 1. UPDATE STOCK PRODUCTS


            const updateProductsPromises = products.map(( product ) => {

                const productQuantity = productId.filter(
                    p => p.productId === product.id
                ).reduce(( acc, item ) => item.quantity + acc, 0);

                if( productQuantity === 0 ) throw new Error(`${product.id} no stock`);

                return tx.product.update(
                    {
                        where: { id: product.id }, 
                        data: {
                            inStock: {
                                decrement: productQuantity
                            }
                        }
                    }
                )
            });
            const updateProducts = await Promise.all( updateProductsPromises );

            updateProducts.forEach(product => {
                if( product.inStock < 0 ){
                    throw new Error(`${ product.title } no stock`);
                }
            })


            // 2. CREATE ORDER
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,
                
                    OrderItem: {
                        createMany: {
                            data: productId.map( p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            })



            // 3. CREATE ORDER ADDRESS

            const { country, ...restAddress } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id
                }
            })


          return {
            order: {
              id: order.id,
              itemsInOrder: order.itemsInOrder,
              subTotal: order.subTotal,
              tax: order.tax,
              total: order.total,
              createdAt: order.createdAt.toISOString(),
            },
            orderAddress,
          };

        });
        
        
    return { ok: true, prismaTx };
    } catch (error) {
        return {
            ok: false,
            message: error
        };
    }



}