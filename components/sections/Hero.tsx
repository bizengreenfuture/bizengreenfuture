'use client';

import { ArrowRight, Leaf, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {

  return (
    <section
      id="hero"
      className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float-slow" />

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
              className="text-green-500/20"
              style={{
                height: `${16 + (i % 3) * 8}px`,
                width: `${16 + (i % 3) * 8}px`,
                transform: `rotate(${i * 45}deg)`
              }}
            />
          </div>
        ))}

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8 order-1">
              {/* Tagline badge */}
              <div className="animate-fade-in-up">
                <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 backdrop-blur-sm text-green-300 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 animate-spin-slow" />
                  <span>Innovation Rooted in Sustainability</span>
                </div>
              </div>

              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up animation-delay-200">
                <span className="text-white">Pioneering a New Era of</span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-gradient">
                  Sustainability
                </span>
                <span className="text-white"> in Uganda</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-400">
                We are driving a bold transformation where clean energy, regenerative
                agriculture, and circular innovation power our farms, industries, and
                communities.
              </p>

              {/* CTA button */}
              <div className="flex items-center justify-center lg:justify-start pt-2 md:pt-4 animate-fade-in-up animation-delay-600">
                <button
                  onClick={() => {
                    const element = document.querySelector('#solutions');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 via-emerald-600 to-green-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-green-700 rounded-xl md:rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 w-full sm:w-auto overflow-hidden"
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
