'use server';

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async(address: Address, userId: string) => {

    try {

        const newAddress = await createOrReplaceAddress( address, userId)
        

        return {
            ok: true,
            address: newAddress
        }

    } catch (error) {
        console.log(error)
        return{
            ok: false,
            message: 'Failed to save Address'
        }
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {

    try {
        
        const storeAddress = await prisma.userAddress.findUnique({
            where: { userId}
        });

        const addressToSave = {
            userId:     userId,
            address:    address.address,
            address2:   address.address2,
            countryId:  address.country,
            firstName:  address.firstName,
            lastName:   address.lastName,
            phone:      address.phone,
            postalCode: address.postalCode,
            city:       address.city
        }

        // INSERT
        if( !storeAddress ){
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })
            return newAddress
        }

        // OR UPDATE
        const updateAddress =  await prisma.userAddress.update({
            where: { userId },
            data: addressToSave
        })

        return updateAddress


    } catch (error) {
        console.log(error)
        return{
            ok: false,
            message: 'Failed to save Address'
        }
    }


}