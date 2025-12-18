'use client';

import About from '@/components/sections/About';
import { Target, Eye, Heart, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Scientific Excellence',
      description:
        'We ground every claim in rigorous research, independent testing, and transparent data.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description:
        'Our methods, results, and partnerships are open for scrutiny and validation.',
    },
    {
      icon: Heart,
      title: 'People-First',
      description:
        'Sustainability must be practical, affordable, and accessible to everyone.',
    },
    {
      icon: Leaf,
      title: 'Environmental Stewardship',
      description:
        'We measure success by the health of our planet and the prosperity of our communities.',
    },
  ];

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
              <span>Who We Are</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200 drop-shadow-lg">
              About Us
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up animation-delay-400">
              Championing a new development model for Uganda and Africa through sustainable innovation
            </p>
          </div>
        </div>
      </section>

      <About />

      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/imagebackgroundbizen.jpg"
            alt="Bizen Green Future Background"
            fill
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/85 to-emerald-900/80"></div>

        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(34 197 94) 0.2px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-emerald-50 leading-relaxed">
              These principles guide every decision we make and every partnership we form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <Card className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm border-2 border-green-700 hover:border-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40">
                        <value.icon className="h-7 w-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {value.title}
                      </h3>
                    </div>
                    <p className="text-emerald-50 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/imagebackgroundbizen.jpg"
            alt="Bizen Green Future Background"
            fill
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/85 to-emerald-900/80"></div>

        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-800/20 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(34 197 94) 0.2px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Stakeholders
            </h2>
            <p className="text-xl text-emerald-50 leading-relaxed">
              We are proud to work with a diverse network of partners and stakeholders across various sectors
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-green-800/90 to-emerald-900/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-green-700/50 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'East West s.a.s- Supertech Italy',
                  'Ministry of Energy & Mineral Development',
                  'Ministry of Works & Transport',
                  'CBS Pewosa',
                  'KCCA',
                  'UTOF (Uganda Taxi Operators Federation)',
                  'Boda Boda Union',
                  'CBS Radio',
                  'Great Lakes Brands Ltd',
                  'Jinja Progressive Sec.school',
                  'Makerere University',
                  'Orogu Tour & Travel',
                  'Nation Media Group',
                  'Welcome Home Ministries',
                  'Markh Investment Ltd',
                ].map((stakeholder, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-br from-green-700/50 to-emerald-800/50 rounded-xl border border-green-600/30 hover:border-emerald-400/50 transition-all duration-300 hover:bg-green-700/70"
                  >
                    <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0"></div>
                    <span className="text-emerald-50 text-sm md:text-base">{stakeholder}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
