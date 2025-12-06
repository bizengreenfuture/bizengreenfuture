'use client';

import { Zap, CheckCircle2, TrendingDown, Award, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SupertechPage() {
  const benefits = [
    'Up to 12% fuel savings',
    'Up to 80% emission reduction',
    'Extended engine lifespan',
    'Reduced maintenance costs',
    'Improved combustion efficiency',
    'Works with all fuel types',
    'Compatible with Euro 6/7 engines',
    'No mechanical modifications needed',
  ];

  const specifications = [
    { label: 'Certification', value: 'ISO 9001:2015' },
    { label: 'Global Installations', value: '600,000+' },
    { label: 'Countries', value: '77' },
    { label: 'Warranty', value: '5 Years' },
    { label: 'Payback Period', value: '3-6 Months' },
    { label: 'Material', value: 'Noble Metals' },
  ];

  return (
    <>
      <section className="pt-24 pb-20 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="h-4 w-4" />
                <span>Global Leader in Fuel Optimization</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Supertech Combustion{' '}
                <span className="text-green-600">Optimization</span>
              </h1>

              <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                Italian-engineered technology that transforms fuel efficiency while
                dramatically reducing emissions. The future of sustainable transport is here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                  Request Demo
                </Button>
                <Link href="/main/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-6 text-lg"
                  >
                    Get in Touch
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
                How It Works
              </h2>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-12">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                        <span className="text-lg font-bold">1</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Device Installation
                      </h3>
                      <p className="text-gray-600">
                        The device is installed directly in the fuel tank. No mechanical
                        modifications to your vehicle are needed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                        <span className="text-lg font-bold">2</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Electromagnetic Optimization
                      </h3>
                      <p className="text-gray-600">
                        The device emits controlled electromagnetic resonance that optimizes fuel
                        molecules, improving combustion efficiency.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                        <span className="text-lg font-bold">3</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Immediate Results
                      </h3>
                      <p className="text-gray-600">
                        Within days, you'll notice improved fuel economy, smoother engine
                        performance, and cleaner emissions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Card className="border-2 border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingDown className="h-6 w-6 text-green-600" />
                      <span>Environmental Impact</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-green-600 mb-1">80%</div>
                      <div className="text-gray-600">Reduction in Harmful Emissions</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Measured reductions in CO, NOx, hydrocarbons, and particulate matter
                        improve air quality and public health.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Zap className="h-6 w-6 text-green-600" />
                      <span>Economic Benefit</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-green-600 mb-1">12%</div>
                      <div className="text-gray-600">Average Fuel Savings</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Payback typically achieved in 3-6 months for high-mileage fleets, with
                        sustained savings over the device's lifespan.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Benefits</h3>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specs</h3>
                  <div className="space-y-4">
                    {specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">{spec.label}</span>
                        <span className="text-gray-900 font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white">
                <div className="max-w-2xl mx-auto text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Safety Certified</h3>
                  <p className="text-green-50 mb-6 leading-relaxed">
                    With over 30 years of global deployment and 600,000+ installations, Supertech
                    has an unmatched safety record. Independent laboratories confirm no health
                    risks and full engine compatibility.
                  </p>
                  <p className="text-sm text-green-100">
                    Validated by 11 universities, 8 government institutions, and 8 independent
                    laboratories worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
