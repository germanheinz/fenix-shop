'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async(id: string) => {

    const session = await auth();

    // const userId = session?.user.id;
    // if( !userId ){
    //     return { 
    //         ok: false,
    //         messsage: 'No User Session'
    //     }
    // }

    try {
        
        // GET ORDER INFO
        const order = await prisma.order.findUnique({
            where:{
                id: id
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,
                        
                        product: {
                            select: {
                                title: true,
                                slug: true,
                            
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                
                }
            }
        })
    
        if(!order) throw new Error('Order does not extis');
    

        // if(session.user.role === 'user'){
        //     console.log('')
        //     if(session.user.id !== order.id){
        //         throw `${ id } no belong to the User`
        //     }
        // }

        return { 
            ok: true,
            order: order,
            address: order.OrderAddress
         };
    } catch (error) {
        console.log(error);
        return{
            ok: false,
            message: 'Order does not exstis'
        }        
    }

}