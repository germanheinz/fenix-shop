'use server';

import prisma from "@/lib/prisma";

export const setTransactionId = async(id: string, transactionId: string) => {

    try {

    const order = await prisma.order.update({
        where: { id },
        data: { transactionId: transactionId }
    })

    if(!order){
        return{
            ok: false,
            message: 'Failed to save TransactionId'
        }
    }
    
    return{
        ok: true
    }

    } catch (error) {
        console.log(error)
        return{
            ok: false,
            message: 'Failed to save TransactionId'
        }
    }

}