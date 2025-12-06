'use client';

import { Award, Globe, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Partners() {
  const partners = [
    {
      name: 'Supertech Italy',
      description: 'Global leader in combustion optimization technology with 27 years of innovation',
      icon: Globe,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'International Universities',
      description: '11 universities validating our technology through peer-reviewed research',
      icon: Award,
      color: 'from-green-500 to-emerald-600',
    },
    {
      name: 'Government Institutions',
      description: '8 government bodies certifying compliance and environmental impact',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'Independent Labs',
      description: '8 accredited laboratories providing rigorous third-party validation',
      icon: Users,
      color: 'from-teal-500 to-cyan-600',
    },
  ];

  return (
    <section id="partners" className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Partners & Backing
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Bizen Green Future Ltd collaborates with world-class institutions and
            organizations that validate our commitment to scientific excellence and
            sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className="border-2 border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${partner.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <partner.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {partner.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Science-Backed Solutions</h3>
            <p className="text-lg text-green-50 leading-relaxed mb-6">
              Every product we deliver is backed by comprehensive research, real-world testing,
              and rigorous third-party validation. Our commitment to transparency and scientific
              integrity ensures that you're investing in solutions that actually work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold mb-2">27+</div>
                <div className="text-green-100">Years of Innovation</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">600K+</div>
                <div className="text-green-100">Global Installations</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">77</div>
                <div className="text-green-100">Countries Served</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
