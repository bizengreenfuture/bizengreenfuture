'use client';

import { Target, Eye, Heart, TrendingUp, Lightbulb, Users } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function About() {
  const pathname = usePathname();
  const showCompanyDescription = pathname === '/about';
  const drivers = [
    {
      icon: Heart,
      title: 'Climate Resilience',
      description: 'Protecting generations to come through sustainable practices',
      gradient: 'from-green-500 to-emerald-600',
    },
    {
      icon: TrendingUp,
      title: 'Circular Bio Economy',
      description: 'Transforming waste into wealth and opportunity',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Users,
      title: 'Social Empowerment',
      description: 'Opening doors for women, youth, and underserved populations',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Lightbulb,
      title: 'Scientific Innovation',
      description: 'Breakthroughs that translate into tangible improvements',
      gradient: 'from-cyan-500 to-blue-600',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
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
        className="absolute inset-0 opacity-[0.05] border-[20px] border-solid border-transparent"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(34 197 94) 0.2px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Company Description - Only show on About page */}
        {showCompanyDescription && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-green-800/90 to-emerald-900/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 border-2 border-green-700/50 shadow-xl">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-emerald-50 leading-relaxed mb-6 text-lg">
                  Bizen Green Future Ltd (formerly Calcigrub General Trading Company Ltd) is a legally registered company in Uganda, incorporated on 22 February 2024 under Certificate of Incorporation / Commercial Registration No. 80034472887209.
                </p>
                <p className="text-emerald-50 leading-relaxed mb-6 text-lg">
                  We are a company built by people who believe in Africa's potential. Bizen Green Future Ltd was founded by a group of partners who have spent many years working across different industries and countries on the continent. Through this journey, we gained practical experience, learned what works, and understood what businesses need to grow. We came together with one shared goal: to build strong, honest, and future-focused enterprises.
                </p>
                <p className="text-emerald-50 leading-relaxed mb-6 text-lg">
                  Our work goes beyond buying and selling. We support businesses and projects by providing strategic guidance, building partnerships, and helping ideas grow into sustainable ventures. We believe that real success comes from long-term thinking, responsible leadership, and creating value that benefits both people and markets.
                </p>
                <p className="text-emerald-50 leading-relaxed mb-6 text-lg">
                  Our head office is located in Kampala, Uganda, within the Rubaga Division. We also operate a branch office in Juba, South Sudan, and maintain representative and contact offices in Rwanda, allowing us to serve clients and partners across the East African region.
                </p>
                <p className="text-emerald-50 leading-relaxed text-lg">
                  At Bizen Green Future Ltd, we are guided by integrity, collaboration, and a commitment to building a greener and more sustainable future. We aim to be a trusted partner to governments, investors, and businesses seeking meaningful and lasting opportunities across Africa and beyond.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Our Mission & Vision
          </h2>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm rounded-3xl p-8 border-2 border-green-700 hover:border-emerald-500 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Our Mission
                </h3>
              </div>
              <p className="text-emerald-50 leading-relaxed text-lg">
                To deliver green solutions that are both practical and profitable.
                We focus on technologies that improve daily lives, strengthen food
                security, reduce waste, and safeguard our shared environment.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm rounded-3xl p-8 border-2 border-green-700 hover:border-emerald-500 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Our Vision
                </h3>
              </div>
              <p className="text-emerald-50 leading-relaxed text-lg">
                A resilient and inclusive society where nothing is wasted and every
                resource has value. Where farmers succeed, industries reduce
                pollution while increasing productivity, and communities flourish.
              </p>
            </div>
          </div>
        </div>

        {/* What Drives Us */}
        <div className="bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-md rounded-3xl p-8 md:p-12 relative overflow-hidden border border-green-700/50 shadow-xl">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">
              What Drives Us
            </h3>
            <p className="text-emerald-50 text-center mb-10 max-w-2xl mx-auto">
              Our core values guide every decision and partnership we form
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {drivers.map((item, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-green-700 to-emerald-800 backdrop-blur-sm rounded-2xl p-6 border border-green-600 hover:border-emerald-400 transition-all duration-300 hover:bg-green-600"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40 group-hover:scale-110 transition-transform duration-300">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-emerald-100 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
