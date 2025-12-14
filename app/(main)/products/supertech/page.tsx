'use client';

import { Zap, CheckCircle2, TrendingDown, Award, Shield, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import ProductsGrid from '@/components/sections/ProductsGrid';
import QuoteForm from '@/components/sections/QuoteForm';

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
      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-gray-900 via-gray-950 to-emerald-950 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-700/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div>
            <div className="inline-flex items-center space-x-2 bg-emerald-600/20 border border-emerald-600/30 backdrop-blur-sm text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              <span>Global Leader in Fuel Optimization</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Supertech Combustion{' '}
              <span className="text-emerald-400">Optimization</span>
            </h1>

            <p className="text-2xl text-gray-300 mb-8 leading-relaxed">
              Italian-engineered technology that transforms fuel efficiency while
              dramatically reducing emissions. The future of sustainable transport is here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-6 text-lg shadow-lg shadow-emerald-600/25"
                onClick={() => {
                  const form = document.getElementById('quote-form');
                  form?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request a Quote
              </Button>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-600/50 text-emerald-400 hover:bg-emerald-600/10 hover:border-emerald-400 px-8 py-6 text-lg w-full sm:w-auto backdrop-blur-sm"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
              </div>

              {/* Right Column - SuperTech Image */}
              <div className="relative">
                <Image
                  src="/supertechexample.png"
                  alt="SuperTech Combustion Optimizer Product"
                  width={600}
                  height={600}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Products from Admin */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-emerald-950 to-gray-950 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-white mb-4 text-center">
              Our SuperTech Products
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12">
              Explore our range of combustion optimization solutions
            </p>
            <ProductsGrid category="supertech" showEmpty={false} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              How It Works
            </h2>

            <div className="bg-gradient-to-r from-gray-800/80 via-emerald-900/30 to-gray-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12 border border-emerald-600/20">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/40">
                      <span className="text-lg font-bold">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Device Installation
                    </h3>
                    <p className="text-gray-300">
                      The device is installed directly in the fuel tank. No mechanical
                      modifications to your vehicle are needed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/40">
                      <span className="text-lg font-bold">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Electromagnetic Optimization
                    </h3>
                    <p className="text-gray-300">
                      The device emits controlled electromagnetic resonance that optimizes fuel
                      molecules, improving combustion efficiency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-600/40">
                      <span className="text-lg font-bold">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Immediate Results
                    </h3>
                    <p className="text-gray-300">
                      Within days, you'll notice improved fuel economy, smoother engine
                      performance, and cleaner emissions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <TrendingDown className="h-6 w-6 text-emerald-400" />
                      <span>Environmental Impact</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-emerald-400 mb-1">80%</div>
                      <div className="text-gray-300">Reduction in Harmful Emissions</div>
                    </div>
                    <div className="bg-emerald-600/20 border border-emerald-600/30 rounded-lg p-4">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Measured reductions in CO, NOx, hydrocarbons, and particulate matter
                        improve air quality and public health.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Zap className="h-6 w-6 text-emerald-400" />
                      <span>Economic Benefit</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-emerald-400 mb-1">12%</div>
                      <div className="text-gray-300">Average Fuel Savings</div>
                    </div>
                    <div className="bg-emerald-600/20 border border-emerald-600/30 rounded-lg p-4">
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Payback typically achieved in 3-6 months for high-mileage fleets, with
                        sustained savings over the device's lifespan.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Benefits & Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Key Benefits</h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Technical Specs</h3>
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center pb-4 border-b border-emerald-600/20">
                      <span className="text-gray-300 font-medium">{spec.label}</span>
                      <span className="text-white font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Badge */}
            <div className="bg-gradient-to-r from-emerald-600/90 to-emerald-700/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-white border border-emerald-600/50 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Safety Certified</h3>
                  <p className="text-emerald-50 mb-6 leading-relaxed">
                    With over 30 years of global deployment and 600,000+ installations, Supertech
                    has an unmatched safety record. Independent laboratories confirm no health
                    risks and full engine compatibility.
                  </p>
                  <p className="text-sm text-emerald-100">
                    Validated by 11 universities, 8 government institutions, and 8 independent
                    laboratories worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-emerald-400" />
                <h3 className="text-3xl font-bold text-white">Official Certifications & Approvals</h3>
              </div>
              <p className="text-gray-300 max-w-2xl mx-auto">
                SuperTech is backed by extensive certifications, patents, and government approvals from around the world
              </p>
            </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ISO 9001:2015 Certificate */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 overflow-hidden cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 mb-3">
                        <Image
                          src="/certificates/iso-9001-2015.png"
                          alt="ISO 9001:2015 Certificate"
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            // Fallback if image doesn't exist yet
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }}
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">ISO 9001:2015</h4>
                      <p className="text-xs text-gray-400">Quality Management System</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Italian Patent */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 overflow-hidden cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 mb-3">
                        <Image
                          src="/certificates/italian-patent.png"
                          alt="Italian Industrial Invention Patent"
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }}
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">Italian Patent</h4>
                      <p className="text-xs text-gray-400">Industrial Invention Patent</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Uganda Ministry Approval */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 overflow-hidden cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 mb-3">
                        <Image
                          src="/certificates/uganda-energy-approval.png"
                          alt="Uganda Ministry of Energy Approval"
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }}
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">Uganda Approval</h4>
                      <p className="text-xs text-gray-400">Ministry of Energy & Mineral Dev.</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Uganda Ministry of Works Approval */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 overflow-hidden cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 mb-3">
                        <Image
                          src="/certificates/uganda-works-approval.png"
                          alt="Uganda Ministry of Works & Transport Approval"
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }}
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">Uganda Approval</h4>
                      <p className="text-xs text-gray-400">Ministry of Works & Transport</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Brazilian Patent */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 overflow-hidden cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 mb-3">
                        <Image
                          src="/certificates/brazilian-patent.png"
                          alt="Brazilian Patent Application"
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }}
                        />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">Brazilian Patent</h4>
                      <p className="text-xs text-gray-400">INPI National Application</p>
                    </CardContent>
                  </Card>
                </div>

                {/* CE Mark */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <Card className="relative bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 hover:border-emerald-600 transition-all duration-300 overflow-hidden cursor-pointer">
                    <CardContent className="p-4">
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-900 mb-3 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl font-bold text-white mb-2">CE</div>
                          <p className="text-xs text-gray-400">European Conformity</p>
                          <p className="text-xs text-gray-500 mt-2">CE 93/116</p>
                          <p className="text-xs text-gray-500">SAE J1321</p>
                        </div>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">CE Certification</h4>
                      <p className="text-xs text-gray-400">European Conformity Mark</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-20 bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Save on Fuel Costs?
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Get a personalized quote for your fleet. Our team will analyze your needs
                  and provide a detailed proposal with projected savings.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'Free consultation and fleet analysis',
                    'Customized ROI projection',
                    'Professional installation support',
                    '5-year warranty coverage',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <QuoteForm 
                defaultInterest="supertech" 
                source="supertech-page"
                title="Get Your Free Quote"
                description="Fill out the form and we'll get back to you within 24 hours with a customized proposal."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
