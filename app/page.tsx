'use client';

import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Solutions from '@/components/sections/Solutions';
import Partners from '@/components/sections/Partners';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Solutions />
      <Partners />
      <Footer />
    </main>
  );
}
