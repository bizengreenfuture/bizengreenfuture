'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Sprout, CheckCircle2, Leaf, Fish, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FertilizersPage() {
  const fertilizers = [
    {
      name: 'Organic Fertilizers',
      icon: Leaf,
      description: 'Premium organic fertilizers created from Black Soldier Fly processing',
      benefits: [
        'Naturally restores soil nutrients',
        'Increases crop yields significantly',
        'Eliminates chemical dependency',
        'Improves soil structure and health',
        'Sustainable waste transformation',
        'Reduces farming costs',
      ],
      color: 'from-green-500 to-emerald-600',
    },
    {
      name: 'Calcifeed Animal Feed',
      icon: Fish,
      description: 'Nutrient-rich premium feed for livestock and poultry',
      benefits: [
        'High natural protein content',
        'Enhanced immunity and growth',
        'Improved feed conversion ratios',
        'Better animal health outcomes',
        'Reduced reliance on imports',
        'Cost-effective nutrition',
      ],
      color: 'from-blue-500 to-cyan-600',
    },
  ];

  const advantages = [
    {
      title: 'Circular Economy',
      description: 'Transform organic waste into valuable agricultural inputs',
      icon: TrendingUp,
    },
    {
      title: 'Scientifically Proven',
      description: 'Results backed by independent laboratory testing and farm trials',
      icon: Award,
    },
    {
      title: 'Sustainability',
      description: 'Reduce chemical inputs while boosting productivity and profitability',
      icon: Sprout,
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-24">
        <section className="py-20 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sprout className="h-4 w-4" />
                <span>Regenerative Agriculture Solution</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Fertilizers & Premium{' '}
                <span className="text-green-600">Animal Feed</span>
              </h1>

              <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                From Black Soldier Fly to your farm. Transform organic waste into soil-restoring
                fertilizers and nutrient-rich animal feeds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                  Order Now
                </Button>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
                Our Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {fertilizers.map((product, index) => (
                  <Card
                    key={index}
                    className="border-2 border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <CardHeader>
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center mb-4`}
                      >
                        <product.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-3xl">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-600 text-lg">{product.description}</p>

                      <div className="space-y-3">
                        {product.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  The Black Soldier Fly Advantage
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                      <Leaf className="h-6 w-6 text-green-600" />
                      <span>For Farmers</span>
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Increases soil organic matter',
                        'Improves water retention',
                        'Boosts microbial activity',
                        'Reduces dependency on imports',
                        'Higher yields at lower cost',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                      <Fish className="h-6 w-6 text-green-600" />
                      <span>For Livestock</span>
                    </h4>
                    <ul className="space-y-2">
                      {[
                        'Complete amino acid profile',
                        'Enhanced growth rates',
                        'Stronger immune system',
                        'Better meat/dairy quality',
                        'Reduced disease incidence',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Why Choose Our Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {advantages.map((adv, index) => (
                    <Card
                      key={index}
                      className="border-2 border-green-100 hover:border-green-300 transition-colors"
                    >
                      <CardContent className="p-8">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                          <adv.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {adv.title}
                        </h4>
                        <p className="text-gray-600">{adv.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farm?</h2>
              <p className="text-xl text-green-50 mb-8 leading-relaxed">
                Join farmers across Uganda who are experiencing higher yields, healthier animals,
                and stronger profitability through sustainable agriculture.
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
