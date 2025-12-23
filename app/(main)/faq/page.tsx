'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqCategories = [
    {
      title: 'Supertech Combustion Technology',
      items: [
        {
          id: 'supertech-1',
          question: 'How does Supertech combustion technology work?',
          answer:
            'Supertech uses electromagnetic resonance to optimize fuel molecules in your tank. This improves combustion efficiency, resulting in better fuel economy and reduced emissions. The device is installed directly in the fuel tank with no mechanical modifications required.',
        },
        {
          id: 'supertech-2',
          question: 'Is Supertech safe? Has it been tested?',
          answer:
            'Absolutely. With over 30 years of global deployment and 600,000+ installations, Supertech has an exemplary safety record. Independent laboratories and government agencies worldwide have validated its safety. The electromagnetic field is localized within the fuel tank and poses no health risks.',
        },
        {
          id: 'supertech-3',
          question: 'What kind of fuel savings can I expect?',
          answer:
            'Studies consistently show fuel savings of 8-12% on average. Results vary based on driving patterns, vehicle condition, and fuel quality. Commercial fleets often see higher savings. Most customers achieve payback within 10 days to 3 months.',
        },
        {
          id: 'supertech-4',
          question: 'Does Supertech work with modern engines?',
          answer:
            'Yes. Supertech is compatible with all engine types, including modern Euro 6/7 standards. While efficiency gains are more pronounced in older engines, even advanced engines demonstrate measurable improvements in fuel economy and emissions reduction.',
        },
        {
          id: 'supertech-5',
          question: 'Will Supertech void my vehicle warranty?',
          answer:
            'No. Installation requires no modification of your vehicle\'s mechanical, hydraulic, or electrical systems. Supertech does not interfere with OEM specifications or insurance coverage.',
        },
        {
          id: 'supertech-6',
          question: 'How long does the device last?',
          answer:
            'Supertech comes with a 5-year warranty. However, real-world fleet data shows devices performing effectively well beyond 10 years with zero maintenance required once installed.',
        },
      ],
    },
    {
      title: 'Fertilizers & Animal Feed',
      items: [
        {
          id: 'fert-1',
          question: 'What is Calcifeed made from?',
          answer:
            'Calcifeed is produced from Black Soldier Fly larvae through an advanced bio-manufacturing process. The larvae are grown on organic waste, creating high-protein, nutrient-rich feed products that are both sustainable and economical.',
        },
        {
          id: 'fert-2',
          question: 'How do your organic fertilizers improve soil health?',
          answer:
            'Our fertilizers restore soil organic matter, improve microbial activity, enhance water retention, and provide balanced nutrient profiles. This creates healthier, more productive soils without chemical dependencies or environmental damage.',
        },
        {
          id: 'fert-3',
          question: 'Can I use Calcifeed for all livestock types?',
          answer:
            'Calcifeed is formulated to be suitable for poultry, cattle, pigs, and fish. Specific formulations may vary by species. Contact us for detailed product specifications for your specific livestock.',
        },
        {
          id: 'fert-4',
          question: 'What are the cost savings compared to imported feeds?',
          answer:
            'Calcifeed typically costs 20-40% less than imported feeds while providing superior nutritional content. For farmers, this means better animal productivity at significantly lower feed costs.',
        },
        {
          id: 'fert-5',
          question: 'How is your product certified for organic farming?',
          answer:
            'Our products meet international organic standards. The production process uses only natural inputs with no synthetic chemicals, making them suitable for certified organic operations.',
        },
      ],
    },
    {
      title: 'General & Environmental',
      items: [
        {
          id: 'gen-1',
          question: 'How much can Supertech reduce emissions?',
          answer:
            'Independent testing shows reductions of up to 80% in harmful emissions including CO, NOx, and particulates. This improves air quality and reduces the environmental impact of transportation and industry.',
        },
        {
          id: 'gen-2',
          question: 'Is Bizen Green Future a verified business?',
          answer:
            'Yes. Our solutions are backed by validation from 11 universities, 8 government institutions, and 8 independent laboratories worldwide. Our claims are supported by peer-reviewed research and real-world fleet data.',
        },
        {
          id: 'gen-3',
          question: 'How can I get Supertech installed in Uganda?',
          answer:
            'Contact us through our website. We provide professional installation services and training. Our team will assess your needs and provide a customized solution with full support.',
        },
        {
          id: 'gen-4',
          question: 'Do you offer bulk pricing for fleet operators?',
          answer:
            'Yes. We provide competitive bulk pricing and customized fleet solutions. Contact our sales team to discuss your specific requirements and get a detailed quotation.',
        },
        {
          id: 'gen-5',
          question: 'What makes Bizen Green Future different?',
          answer:
            'We combine global innovation with deep local expertise. Our products are science-backed, practically implemented, and designed to benefit people and planet equally. We partner with communities, not just sell products.',
        },
      ],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-[70vh] flex items-center overflow-hidden">
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
              <span>Questions & Answers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200 drop-shadow-lg">
              Frequently Asked Questions
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up animation-delay-400">
              Everything you need to know about our products and solutions
            </p>
          </div>
        </div>
      </section>

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
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-[0.05]">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgb(16 185 129) 0.2px, transparent 0)`,
              backgroundSize: '40px 40px',
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-16">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    {category.title}
                  </h2>

                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.id} className="group relative">
                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-xl blur opacity-0 ${openItems[item.id] ? 'opacity-30' : 'group-hover:opacity-20'} transition-opacity duration-500`} />
                        <Card className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm border-2 border-green-700 hover:border-emerald-500 transition-all duration-300 overflow-hidden shadow-lg">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full text-left"
                          >
                            <CardContent className="p-6 flex items-start justify-between cursor-pointer hover:bg-green-700/50 transition-colors">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                  {item.question}
                                </h3>
                                {openItems[item.id] && (
                                  <p className="text-emerald-50 leading-relaxed mt-4">
                                    {item.answer}
                                  </p>
                                )}
                              </div>
                              <ChevronDown
                                className={`h-6 w-6 text-emerald-300 flex-shrink-0 ml-4 transition-transform ${
                                  openItems[item.id] ? 'rotate-180' : ''
                                }`}
                              />
                            </CardContent>
                          </button>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-16 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-3xl blur opacity-30" />
                <div className="relative bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-white text-center border border-green-700 shadow-xl shadow-emerald-500/20">
                  <h2 className="text-3xl font-bold mb-4 text-white">Still Have Questions?</h2>
                  <p className="text-emerald-50 mb-6 text-lg">
                    Get in touch with our team for more information about our products and
                    services.
                  </p>
                  <Link href="/contact" className="inline-block">
                    <button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg">
                      Contact Us
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
