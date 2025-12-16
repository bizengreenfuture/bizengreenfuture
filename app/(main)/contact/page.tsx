'use client';

import Contact from '@/components/sections/Contact';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-[70vh] flex items-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/85 to-emerald-900/80"></div>

        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs for depth */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl animate-float-slow" />

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
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 text-emerald-100 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg animate-fade-in-up">
              <Mail className="h-4 w-4" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200 drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up animation-delay-400">
              Get in touch with us to learn more about our sustainable solutions and how we can help
            </p>
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
