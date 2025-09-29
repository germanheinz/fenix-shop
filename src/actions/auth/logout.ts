import { signOut } from '@/auth.config';
import { sign } from 'crypto'
import React from 'react'

export const logout = async() => {

    await signOut();
      
}
