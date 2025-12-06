'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Leaf, Mail, MapPin, Phone, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  // Target date: December 15, 2025
  const targetDate = new Date('2025-12-15T00:00:00').getTime();

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center group">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Main container */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1 shadow-2xl">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
            {/* Top half */}
            <div className="relative h-16 sm:h-20 md:h-24 w-20 sm:w-24 md:w-28 flex items-end justify-center pb-1 bg-gradient-to-b from-gray-700/50 to-transparent">
              <span 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-green-200 tabular-nums animate-pulse-slow"
                style={{ fontFamily: "'Space Grotesk', 'SF Mono', monospace" }}
              >
                {mounted ? String(value).padStart(2, '0') : '00'}
              </span>
            </div>
            
            {/* Divider line */}
            <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
            
            {/* Bottom reflection */}
            <div className="h-3 sm:h-4 bg-gradient-to-b from-gray-700/30 to-transparent" />
          </div>
        </div>
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border border-green-500/20 group-hover:border-green-400/40 transition-colors duration-500" />
      </div>
      
      <span className="mt-3 sm:mt-4 text-xs sm:text-sm font-medium text-green-300/80 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950">
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
              className={`h-${4 + (i % 3) * 2} w-${4 + (i % 3) * 2} text-green-500/20 rotate-${i * 30}`} 
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

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Logo and brand */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <div className="relative inline-block mb-6">
            {/* Logo glow */}
            <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse-slow" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4 sm:p-6 border border-white/20">
              <Image
                src="/logo.png"
                alt="Bizen Green Future"
                width={80}
                height={80}
                className="object-contain sm:w-24 sm:h-24"
              />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            Bizen Green Future
            <span className="text-green-400">.</span>
          </h1>
          <p className="text-green-400 font-medium text-sm sm:text-base md:text-lg tracking-wide">
            Innovation Rooted in Sustainability
          </p>
        </div>

        {/* Coming Soon text */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up animation-delay-200">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <Sparkles className="h-4 w-4 text-green-400 animate-spin-slow" />
            <span className="text-green-300 font-medium text-sm sm:text-base">Something Amazing is Coming</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-gradient">
              Coming Soon
            </span>
          </h2>
        </div>

        {/* Countdown timer */}
        <div className="mb-10 sm:mb-14 animate-fade-in-up animation-delay-400">
          <p className="text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">
            Launching on <span className="text-green-400 font-semibold">December 15, 2025</span>
          </p>
          
          <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <TimeUnit value={timeLeft.days} label="Days" />
            
            <div className="flex flex-col gap-2 sm:gap-3 pb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-500" />
            </div>
            
            <TimeUnit value={timeLeft.hours} label="Hours" />
            
            <div className="flex flex-col gap-2 sm:gap-3 pb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-500" />
            </div>
            
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            
            <div className="hidden sm:flex flex-col gap-2 sm:gap-3 pb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-500" />
            </div>
            
            <div className="hidden sm:block">
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-gray-400 text-sm animate-fade-in-up animation-delay-600">
          <a href="tel:+256700000000" className="flex items-center gap-2 hover:text-green-400 transition-colors">
            <Phone className="h-4 w-4" />
            <span>+256 XXX XXXXXX</span>
          </a>
          <a href="mailto:info@bizengreen.co.ug" className="flex items-center gap-2 hover:text-green-400 transition-colors">
            <Mail className="h-4 w-4" />
            <span>info@bizengreen.co.ug</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Kampala, Uganda</span>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-12 sm:mt-16 text-center animate-fade-in-up animation-delay-800">
          <p className="text-gray-600 text-xs sm:text-sm">
            © {new Date().getFullYear()} Bizen Green Future Ltd. All rights reserved.
          </p>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes leaf-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
          animation-delay: 4s;
        }
        
        .animate-leaf-fall {
          animation: leaf-fall 20s linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
