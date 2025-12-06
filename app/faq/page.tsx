'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
            'Studies consistently show fuel savings of 8-12% on average. Results vary based on driving patterns, vehicle condition, and fuel quality. Commercial fleets often see higher savings. Most customers achieve payback within 3-6 months.',
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
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-24">
        <section className="py-20 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600">
                Everything you need to know about our products and solutions
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    {category.title}
                  </h2>

                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <Card
                        key={item.id}
                        className="border-2 border-gray-100 hover:border-green-200 transition-colors overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="w-full text-left"
                        >
                          <CardContent className="p-6 flex items-start justify-between cursor-pointer hover:bg-green-50/30 transition-colors">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {item.question}
                              </h3>
                              {openItems[item.id] && (
                                <p className="text-gray-600 leading-relaxed mt-4">
                                  {item.answer}
                                </p>
                              )}
                            </div>
                            <ChevronDown
                              className={`h-6 w-6 text-green-600 flex-shrink-0 ml-4 transition-transform ${
                                openItems[item.id] ? 'rotate-180' : ''
                              }`}
                            />
                          </CardContent>
                        </button>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-16 bg-gradient-to-r from-green-600 to-emerald-700 rounded-3xl p-8 md:p-12 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-green-50 mb-6 text-lg">
                  Get in touch with our team for more information about our products and
                  services.
                </p>
                <Link href="/contact" className="inline-block">
                  <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

import Link from 'next/link';
