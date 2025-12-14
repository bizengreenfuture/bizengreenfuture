'use client';

import Impact from '@/components/sections/Impact';

export default function ImpactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-gray-900 via-gray-950 to-emerald-950 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-700/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Impact
            </h1>
            <p className="text-xl text-gray-300">
              Transforming communities, protecting the environment, and building a sustainable future
            </p>
          </div>
        </div>
      </section>

      <Impact />
    </>
  );
}
