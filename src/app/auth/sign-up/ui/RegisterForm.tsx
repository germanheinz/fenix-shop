'use client'

import { login, registerUser } from '@/actions';
import { geist_Mono } from '@/config/fonts'
import clsx from 'clsx';
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

type FormInputs = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {


    const { register, handleSubmit, formState: { errors } }= useForm<FormInputs>();

    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async( data: FormInputs) => {

        setErrorMessage('');
        const { name, email, password } = data

        
        //server action
        const resp = await registerUser(name, email, password);

        if( !resp.ok){
          setErrorMessage( resp.message );
          return;
        }

        await login( email.toLocaleLowerCase(), password);
        
        window.location.replace('/');        
    }


  return (
      <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ geist_Mono.className } text-4xl mb-5` }>Ingresar</h1>

      <form onSubmit={ handleSubmit( onSubmit )} className="flex flex-col">

        {/* {
            errors.name?.type === 'required' && (
                <span className='text-red-500'> * the name is required</span>
            )
        } */}

        <label htmlFor="text">Name</label>
        
        <input
          className={
            clsx(
            "px-5 py-2  bg-gray-200 rounded mb-5",{ 'border-red-500': errors.name}
            )
          }
          type="text" autoFocus
          {...register('name', {required: true }) } />

        <label htmlFor="email">Email</label>
        
        <input
        className={
            clsx(
            "px-5 py-2  bg-gray-200 rounded mb-5",{ 'border-red-500': errors.email}
            )
          }
          type="email" autoFocus
          {...register('email', {required: true, pattern: /^\S+@\S+$/i }) }/>


        <label htmlFor="text">Password</label>
        <input
        className={
            clsx(
            "px-5 py-2  bg-gray-200 rounded mb-5",{ 'border-red-500': errors.password}
            )
          }
          type="texy"
          autoFocus
          {...register('password', {required: true }) } />

        
        <span className='text-red-500'>{ errorMessage }</span>
        
        <button
          
          className="btn-primary">
          Ingresar
        </button>




        {/* divisor l ine */ }
        <div className="flex items-center my-5">
          <div className="flex-1 -t -gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 -t -gray-500"></div>
        </div>

        <Link
          href="/auth/login" 
          className="btn-secondary text-center">
          Sign in
        </Link>

      </form>
    </div>
  )
}
