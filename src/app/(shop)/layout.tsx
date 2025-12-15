"use client";
import React from 'react';
import { Footer, Sidebar, TestBanner } from '@/components';
import { TopMenu } from '../../components/ui/top-menu/TopMenu';

export default function ShopLayout({ children }: { children: React.ReactElement }) {
  return (
      <main className="min-h-screen">
        <TestBanner />
        <div className="px-5">
          <TopMenu />
          <Sidebar />
          <div className='px-10'>
            {children}
          </div>
          <Footer />
        </div>
      </main>
  );
}