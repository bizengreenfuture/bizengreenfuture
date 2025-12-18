'use client';

import { Sprout, CheckCircle2, Leaf, Fish, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import ProductsGrid from '@/components/sections/ProductsGrid';
import QuoteForm from '@/components/sections/QuoteForm';

export default function FertilizersPage() {
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
    <>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/imagebackgroundbizen.jpg"
            alt="Bizen Green Future Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/85 to-emerald-900/80"></div>

        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient orbs for depth */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-400/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl animate-float-slow" />

          {/* Subtle grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 text-emerald-100 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg animate-fade-in-up">
              <Sprout className="h-4 w-4" />
              <span>Regenerative Agriculture Solution</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200 drop-shadow-lg">
              Fertilizers & Premium{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-teal-300">Animal Feed</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 mb-8 leading-relaxed animate-fade-in-up animation-delay-400 drop-shadow-lg">
              From Black Soldier Fly to your farm. Transform organic waste into soil-restoring
              fertilizers and nutrient-rich animal feeds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-6 text-lg shadow-lg shadow-emerald-500/25"
                onClick={() => {
                  const form = document.getElementById('quote-form');
                  form?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Order Now
              </Button>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-emerald-500/50 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-600 px-8 py-6 text-lg w-full sm:w-auto backdrop-blur-sm"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Overview */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/imagebackgroundbizen.jpg"
            alt="Bizen Green Future Background"
            fill
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/85 to-emerald-900/80"></div>

        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

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
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">
              Our Product Lines
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Organic Fertilizers Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <Card className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm border-2 border-green-700 hover:border-emerald-500 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-emerald-500/20">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-400/40">
                      <Leaf className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-white">Organic Fertilizers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-emerald-50 text-lg">
                      Premium organic fertilizers created from Black Soldier Fly processing
                    </p>
                    <div className="space-y-3">
                      {[
                        'Naturally restores soil nutrients',
                        'Increases crop yields significantly',
                        'Eliminates chemical dependency',
                        'Improves soil structure and health',
                        'Sustainable waste transformation',
                        'Reduces farming costs',
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                          <span className="text-emerald-50">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Animal Feed Card */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                <Card className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm border-2 border-green-700 hover:border-emerald-500 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-emerald-500/20">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-400/40">
                      <Fish className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl text-white">Animal Feed (Calcifeed)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-emerald-50 text-lg">
                      Nutrient-rich premium feed for livestock and poultry
                    </p>
                    <div className="space-y-3">
                      {[
                        'High natural protein content',
                        'Enhanced immunity and growth',
                        'Improved feed conversion ratios',
                        'Better animal health outcomes',
                        'Reduced reliance on imports',
                        'Cost-effective nutrition',
                      ].map((benefit, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-1" />
                          <span className="text-emerald-50">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* BSF Advantage */}
            <div className="bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-12 border border-green-700 relative overflow-hidden">
              {/* Background orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  The Black Soldier Fly Advantage
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white flex items-center space-x-2">
                      <Leaf className="h-6 w-6 text-emerald-400" />
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
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-emerald-50">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white flex items-center space-x-2">
                      <Fish className="h-6 w-6 text-emerald-400" />
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
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-emerald-50">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-8 text-center">
                Why Choose Our Products
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {advantages.map((adv, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    <Card className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm border-2 border-green-700 hover:border-emerald-500 transition-all duration-300 shadow-lg">
                      <CardContent className="p-8">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-400/40">
                          <adv.icon className="h-6 w-6 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {adv.title}
                        </h4>
                        <p className="text-emerald-50">{adv.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Products - Fertilizers */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/imagebackgroundbizen.jpg"
            alt="Bizen Green Future Background"
            fill
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/85 to-emerald-900/80"></div>

        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

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
          <div className="max-w-6xl mx-auto space-y-16 relative z-10">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 text-center">
                Our Fertilizer Products
              </h2>
              <p className="text-xl text-emerald-50 text-center mb-12">
                Premium organic fertilizers for sustainable farming
              </p>
              <ProductsGrid category="fertilizers" showEmpty={false} />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white mb-4 text-center">
                Animal Feed Products
              </h2>
              <p className="text-xl text-emerald-50 text-center mb-12">
                Nutrient-rich feeds for healthy livestock
              </p>
              <ProductsGrid category="feed" showEmpty={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="quote-form" className="py-24 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/imagebackgroundbizen.jpg"
            alt="Bizen Green Future Background"
            fill
            className="object-cover"
            quality={90}
          />
        </div>

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-900/85 to-emerald-900/80"></div>

        {/* Additional subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

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
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Ready to Transform Your Farm?
                </h2>
                <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
                  Join farmers across Uganda who are experiencing higher yields, healthier animals,
                  and stronger profitability through sustainable agriculture.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'Free consultation and soil analysis',
                    'Customized product recommendations',
                    'Bulk pricing available',
                    'Delivery across Uganda',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <span className="text-emerald-50">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <QuoteForm 
                defaultInterest="fertilizers" 
                source="fertilizers-page"
                title="Get Your Order Quote"
                description="Tell us about your farm and we'll recommend the best products for your needs."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500/90 to-emerald-600/90 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Start Your Sustainable Journey</h2>
            <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
              Whether you're a small-scale farmer or managing a large agricultural operation,
              we have the products and expertise to help you succeed sustainably.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold shadow-lg">
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
