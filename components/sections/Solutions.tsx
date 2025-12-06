'use client';

import {
  Zap,
  Leaf,
  TrendingDown,
  Shield,
  Sprout,
  Fish,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Breakthrough innovations that redefine how Uganda powers its
            industries, feeds its people, and protects its natural environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-2 border-green-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <Badge className="bg-green-600 text-white">
                  ISO 9001:2015 Certified
                </Badge>
              </div>
              <CardTitle className="text-3xl">Supertech Clean Combustion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Italian-engineered combustion optimization technology that
                transforms fuel efficiency. The future of sustainable transport and
                industry is here.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    12%
                  </div>
                  <div className="text-sm text-gray-600">Fuel Savings</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    80%
                  </div>
                  <div className="text-sm text-gray-600">Emissions Cut</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  'Dramatically lower operational costs',
                  'Extended engine lifespan',
                  'Reduced maintenance expenses',
                  'Cleaner air and healthier communities',
                  'Competitive environmental advantage',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-500 mb-2">
                  Proven Track Record
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">600K+</div>
                    <div className="text-xs text-gray-600">Installations</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">70</div>
                    <div className="text-xs text-gray-600">Countries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">27</div>
                    <div className="text-xs text-gray-600">Years</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-3xl">
                Circular Bio Manufacturing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Using Black Soldier Fly larvae, we transform organic waste into
                products that nourish the land and strengthen livestock.
              </p>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-xl p-5">
                  <div className="flex items-center space-x-3 mb-3">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <h4 className="font-semibold text-lg text-gray-900">
                      Organic Fertilizers
                    </h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span>Restore depleted soils naturally</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span>Boost crop yields significantly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span>Eliminate harmful chemicals</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-xl p-5">
                  <div className="flex items-center space-x-3 mb-3">
                    <Fish className="h-6 w-6 text-green-600" />
                    <h4 className="font-semibold text-lg text-gray-900">
                      Calcifeed Animal Feed
                    </h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span>Rich in natural protein and nutrients</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span>Improve growth rates and immunity</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-1" />
                      <span>Reduce reliance on imported feeds</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      Sustainable Agriculture
                    </div>
                    <div className="text-sm text-gray-600">
                      Benefits farmers, elevates animal wellbeing, revitalizes the
                      planet
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Beyond Products: Our Commitment
            </h3>
            <p className="text-lg text-green-50 mb-8 leading-relaxed">
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
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
                >
                  <item.icon className="h-8 w-8 mb-3 mx-auto" />
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-green-50">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
