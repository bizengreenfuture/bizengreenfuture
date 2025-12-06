'use client';

import { Target, Eye, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Who We Are
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Bizen Green Future Ltd is a passionate champion of a new development
            model for Uganda and Africa. We exist to prove that sustainability is
            not a luxury for the future but a requirement for progress today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver green solutions that are both practical and profitable.
                We focus on technologies that improve daily lives, strengthen food
                security, reduce waste, and safeguard our shared environment.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A resilient and inclusive society where nothing is wasted and every
                resource has value. Where farmers succeed, industries reduce
                pollution while increasing productivity, and communities flourish.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What Drives Us
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Heart,
                title: 'Climate Resilience',
                description:
                  'Protecting generations to come through sustainable practices',
              },
              {
                icon: TrendingUp,
                title: 'Circular Bio Economy',
                description: 'Transforming waste into wealth and opportunity',
              },
              {
                icon: Target,
                title: 'Social Empowerment',
                description:
                  'Opening doors for women, youth, and underserved populations',
              },
              {
                icon: Heart,
                title: 'Scientific Innovation',
                description:
                  'Breakthroughs that translate into tangible improvements',
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
