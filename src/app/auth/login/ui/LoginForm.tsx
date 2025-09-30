'use client';

import React, { useEffect } from 'react'
import { useActionState } from 'react';
import Link from 'next/link'
import { authenticate } from '@/actions';
import { IoInformationOutline } from 'react-icons/io5';
import { useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {

  const [ state, dispatch] = useActionState(authenticate, undefined);

  const router = useRouter();

  useEffect(() => {
    if(state === 'Success') { window.location.replace('/')}
  }, [state, router])
  

  return (
    <form action={ dispatch } className="flex flex-col">

        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 bg-gray-200 rounded mb-5"
          type="email" 
          name="email" 
        />

        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 bg-gray-200 rounded mb-5"
          type="password" 
          name="password"
        />

        {/*  */}

        <div
            className="flex mb-5 h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true">

                {state == "CredentialsSignIn" && (
                  <>
                    <IoInformationOutline className="flex flex-row h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">Credentials not valid!</p>
                  </>
                )}
        </div>
        {/* </div> */}

        {/*  */}


        <LoginButton />

        {/* divider line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/sign-up" className="btn-secondary text-center">
          Sign up
        </Link>

        {/* 👇 mostrar feedback */}
        {state && (
          <p className="mt-3 text-red-500 text-sm">{state}</p>
        )}
    </form>
  )
};

function LoginButton() {
  const { pending } = useFormStatus();


  
  return (
  <button type="submit" disabled={ pending } className={ clsx({
    "btn-primary": !pending, "btn-disabled": pending })}>
    Log in
  </button>
  )


}
