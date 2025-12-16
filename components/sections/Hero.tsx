'use client';

import { ArrowRight, Leaf } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {

  return (
    <section
      id="hero"
      className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/imagebackgroundbizen.jpg"
          alt="Bizen Green Future Background"
          fill
          className="object-cover"
          priority
          quality={90}
        />
      </div>

      {/* Green Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-emerald-800/60 to-green-900/70"></div>

      {/* Additional subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs for depth */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl animate-float-slow" />

        {/* Floating leaves */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-leaf-fall"
            style={{
              left: `${15 + i * 15}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + i * 3}s`,
            }}
          >
            <Leaf
              className="text-green-300/40"
              style={{
                height: `${16 + (i % 3) * 8}px`,
                width: `${16 + (i % 3) * 8}px`,
                transform: `rotate(${i * 45}deg)`
              }}
            />
          </div>
        ))}

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Full Width Description */}
          <div className="mb-8 md:mb-12 lg:mb-16 text-center animate-fade-in-up animation-delay-200">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-emerald-50 max-w-5xl mx-auto leading-relaxed drop-shadow-lg font-bold">
              We are driving a bold transformation where clean energy, regenerative
              agriculture, and circular innovation power our farms, industries, and
              communities.
            </p>
          </div>

          {/* Grid Layout: Headline + CTA on left, Image on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8 order-1">
              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight animate-fade-in-up animation-delay-400">
                <span className="text-white">Pioneering a New Era of</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300 animate-gradient">
                  Sustainability
                </span>
                <span className="text-white"> in Uganda</span>
              </h1>

              {/* CTA button */}
              <div className="flex items-center justify-center lg:justify-start pt-2 md:pt-4 animate-fade-in-up animation-delay-600">
                <button
                  onClick={() => {
                    const element = document.querySelector('#solutions');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 via-emerald-500 to-green-500 hover:from-emerald-600 hover:via-emerald-600 hover:to-green-600 rounded-xl md:rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 w-full sm:w-auto overflow-hidden"
                >
                  {/* Button content */}
                  <span className="relative flex items-center gap-2 md:gap-3 z-10">
                    <span>Explore Our Solutions</span>
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  
                  {/* Shine effect on hover */}
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
                </button>
              </div>
            </div>

            {/* Right Column - SuperTech Image */}
            <div className="relative order-2 flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
                <Image
                  src="/supertechexample.png"
                  alt="SuperTech Combustion Optimizer"
                  width={600}
                  height={600}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
