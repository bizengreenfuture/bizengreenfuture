'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Impact from '@/components/sections/Impact';

export default function ImpactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-24">
        <Impact />
      </div>
      <Footer />
    </main>
  );
}
