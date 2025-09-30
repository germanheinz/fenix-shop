'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const registerUser = async(name: string, email: string, password: string) => {


    try{

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email.toLocaleLowerCase(),
                password: bcrypt.hashSync(password),
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        });

        return{
            ok: true,
            user: user,
            message: 'User created successfully!'
        }

    }
    catch(error){
        console.log(error);
        return {
            ok: false,
            message: 'Error creating User'
        }
    }




}