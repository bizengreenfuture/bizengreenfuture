'use client';

import {
  TrendingUp,
  Users,
  Leaf,
  Award,
  Target,
  Globe,
  Heart,
  Briefcase,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Impact() {
  const impacts = [
    {
      icon: TrendingUp,
      title: 'Economic Prosperity',
      description:
        'Industries spend less on fuel and maintenance while gaining greater efficiency. Farmers experience improved harvests and higher household incomes.',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Leaf,
      title: 'Environmental Health',
      description:
        'Cleaning the air children breathe, restoring soils that feed our nation, and reducing waste that burdens ecosystems and cities.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Users,
      title: 'Community Empowerment',
      description:
        'Creating meaningful green jobs for young people and empowering women to be leaders in innovation and sustainability.',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Heart,
      title: 'Health & Dignity',
      description:
        'Benefits extend into the health, dignity, and resilience of communities across Uganda and beyond.',
      color: 'from-green-600 to-emerald-700',
    },
  ];

  const reasons = [
    {
      icon: Globe,
      title: 'Global Innovation, Local Expertise',
      description:
        'World-class technology rooted in the realities of Ugandan communities, farms, and industries.',
    },
    {
      icon: Award,
      title: 'Proven Results',
      description:
        'Backed by data, science, and real-world performance. Every product is tested, validated, and designed to make a measurable difference.',
    },
    {
      icon: Target,
      title: 'Partnership & Support',
      description:
        'Hands-on support, ongoing training, and continued commitment to success long after installation or delivery.',
    },
    {
      icon: Briefcase,
      title: 'Driving Change',
      description:
        'Not simply selling products, but enabling businesses to compete, farmers to prosper, and Uganda to lead.',
    },
  ];

  return (
    <section id="impact" className="py-20 bg-green-900 relative overflow-hidden">
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
            Impact & Benefits
          </h2>
          <p className="text-xl text-emerald-50 leading-relaxed">
            Impact is not something we talk about. It is something we create every
            single day. Our technologies are transforming lives, businesses, and
            communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {impacts.map((impact, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <Card className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm border-2 border-green-700 hover:border-emerald-500 hover:shadow-emerald-500/20 transition-all duration-300 overflow-hidden shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40">
                      <impact.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {impact.title}
                    </h3>
                  </div>
                  <p className="text-emerald-50 leading-relaxed">
                    {impact.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12 border border-green-700 relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              The Power of Impact
            </h3>
            <p className="text-xl text-emerald-50 text-center mb-12 max-w-3xl mx-auto">
              Every technology we champion, every partnership we nurture, and every
              solution we deliver transforms challenges into opportunities.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40">
                    <Globe className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    The Planet Wins
                  </h4>
                </div>
                <p className="text-emerald-50">
                  Cleaner air, restored soils, reduced waste
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    People Win
                  </h4>
                </div>
                <p className="text-emerald-50">
                  Better health, dignity, and resilience
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">
                    The Future Wins
                  </h4>
                </div>
                <p className="text-emerald-50">
                  Growth, justice, environmental renewal
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Why Choose Bizen
          </h3>
          <p className="text-xl text-emerald-50 text-center mb-12 max-w-3xl mx-auto">
            Choosing Bizen Green Future Ltd means choosing a partner who believes
            sustainability must work for people first.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-700 hover:border-emerald-500 hover:shadow-emerald-500/20 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-400/40">
                    <reason.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {reason.title}
                  </h4>
                </div>
                <p className="text-emerald-50">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
