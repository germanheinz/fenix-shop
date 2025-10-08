import { auth } from '@/auth.config'
import prisma from '@/lib/prisma';

export const getPaginaterUser = async() => {

    const session = await auth();

    if( session?.user.role !== 'admin'){
        return{
            ok: false,
            message:'should be an admin user'
        }
    }

    const users = await prisma.user.findMany({
        orderBy:{
            name: 'desc'
        }
    });

    return{
        ok: true,
        users: users
    }
    
   
}
