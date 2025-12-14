'use client';

import {
  Zap,
  Leaf,
  TrendingDown,
  Shield,
  Sprout,
  Fish,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-gradient-to-b from-gray-900 via-gray-950 to-emerald-950 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(16 185 129) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-600/20 border border-emerald-600/30 backdrop-blur-sm text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>Our Solutions</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Breakthrough Innovations
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Technologies that redefine how Uganda powers its industries, feeds its people,
            and protects its natural environment.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Supertech Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-emerald-600/30 hover:border-emerald-600 shadow-xl hover:shadow-emerald-600/20 transition-all duration-300 h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/40">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/20 border border-emerald-600/30 text-emerald-400">
                  ISO 9001:2015 Certified
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Supertech Clean Combustion
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Italian-engineered combustion optimization technology that
                transforms fuel efficiency. The future of sustainable transport and
                industry is here.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-xl p-4 border border-emerald-600/30">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300 mb-1">
                    12%
                  </div>
                  <div className="text-sm text-gray-300">Fuel Savings</div>
                </div>
                <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-xl p-4 border border-emerald-600/30">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300 mb-1">
                    80%
                  </div>
                  <div className="text-sm text-gray-300">Emissions Cut</div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2 mb-6">
                {[
                  'Dramatically lower operational costs',
                  'Extended engine lifespan',
                  'Cleaner air and healthier communities',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Track Record */}
              <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-emerald-600/20">
                <div className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
                  Proven Track Record
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-white">600K+</div>
                    <div className="text-xs text-gray-400">Installations</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">70</div>
                    <div className="text-xs text-gray-400">Countries</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">27</div>
                    <div className="text-xs text-gray-400">Years</div>
                  </div>
                </div>
              </div>

              <Link href="/products/supertech">
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-600/25">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Bio Manufacturing Card */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border-2 border-emerald-600/30 hover:border-emerald-600 shadow-xl hover:shadow-emerald-600/20 transition-all duration-300 h-full">
              {/* Header */}
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-600/40">
                <Sprout className="h-8 w-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Circular Bio Manufacturing
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Using Black Soldier Fly larvae, we transform organic waste into
                products that nourish the land and strengthen livestock.
              </p>

              {/* Product lines */}
              <div className="space-y-4 mb-6">
                {/* Fertilizers */}
                <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-xl p-5 border border-emerald-600/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-600/40">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">
                      Organic Fertilizers
                    </h4>
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      'Restore depleted soils naturally',
                      'Boost crop yields significantly',
                      'Eliminate harmful chemicals',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Animal Feed */}
                <div className="bg-gradient-to-br from-emerald-600/20 to-emerald-700/20 rounded-xl p-5 border border-emerald-600/30">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-600/40">
                      <Fish className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">
                      Calcifeed Animal Feed
                    </h4>
                  </div>
                  <ul className="space-y-1.5">
                    {[
                      'Rich in natural protein and nutrients',
                      'Improve growth rates and immunity',
                      'Reduce reliance on imported feeds',
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/products/fertilizers">
                <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg shadow-emerald-600/25">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA - Dark themed */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-emerald-950 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden border border-emerald-600/20">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-700/10 rounded-full blur-3xl" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h3 className="text-3xl font-bold mb-4">
              Beyond Products: Our Commitment
            </h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              We work hand in hand with communities, institutions, and industries
              to promote responsible production, reduce pollution, and advance
              climate resilience at every level of society.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: TrendingDown,
                  title: 'Waste Reduction',
                  description: 'Turn waste into opportunity',
                },
                {
                  icon: Leaf,
                  title: 'Cleaner Ecosystems',
                  description: 'Healthier air and environment',
                },
                {
                  icon: Shield,
                  title: 'Climate Resilience',
                  description: 'Adaptive capacity building',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-600/20 hover:border-emerald-600/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-emerald-600/40 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
