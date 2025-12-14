'use client';

import { Target, Eye, Heart, TrendingUp, Lightbulb, Users } from 'lucide-react';

export default function About() {
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
    <section id="about" className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-emerald-950 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(16 185 129) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-600/20 border border-emerald-600/30 backdrop-blur-sm text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>Who We Are</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Mission & Vision
          </h2>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-emerald-600/30 hover:border-emerald-600 shadow-lg hover:shadow-emerald-600/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/40">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                To deliver green solutions that are both practical and profitable.
                We focus on technologies that improve daily lives, strengthen food
                security, reduce waste, and safeguard our shared environment.
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-emerald-600/30 hover:border-emerald-600 shadow-lg hover:shadow-emerald-600/20 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/40">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                A resilient and inclusive society where nothing is wasted and every
                resource has value. Where farmers succeed, industries reduce
                pollution while increasing productivity, and communities flourish.
              </p>
            </div>
          </div>
        </div>

        {/* What Drives Us */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-emerald-950 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">
              What Drives Us
            </h3>
            <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
              Our core values guide every decision and partnership we form
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {drivers.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-600/40 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
