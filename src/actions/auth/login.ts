'use server';

import { signIn } from "@/auth.config";
import { sign } from "crypto";

export async function authenticate (
  prevState: string | undefined, 
  formData: FormData) {

    try {
      console.log( Object.fromEntries(formData) );
      await signIn("credentials", {
        ...Object.fromEntries(formData), 
        redirect: false,
      });

      return 'Success';
    
    } catch (error) {
      
      console.log(error);

      return "CredentialsSignIn";
    }

  }


  export const login = async(email: string, password: string) => {
    try {
      await signIn('credentials', { email, password })

      return { ok: true };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        message: 'Could not Log in'
      }
    }


  }
  
  
  