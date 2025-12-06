'use client';

import About from '@/components/sections/About';
import { Target, Eye, Heart, Leaf } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="pt-24">
        <About />
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              These principles guide every decision we make and every partnership we form.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 border-green-100 hover:border-green-300 transition-colors"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                    <value.icon className="h-7 w-7 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
