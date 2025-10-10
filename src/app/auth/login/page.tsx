import { Inter } from 'next/font/google';
import { LoginForm } from './ui/LoginForm';
import { fontMono } from '@/config/fonts';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ fontMono.className } text-4xl mb-5` }>Sign In</h1>

      <LoginForm />      
    </div>
  );
}