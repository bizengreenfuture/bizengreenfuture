'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function Partners() {
  const partners = useQuery(api.partners.listActive);

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading organizations to bring innovative sustainable solutions to Uganda
          </p>
        </div>

        {!partners ? (
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-40 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center gap-8 md:gap-12 flex-wrap">
            {partners.map((partner) => (
              <a
                key={partner._id}
                href={partner.website || '#'}
                target={partner.website ? '_blank' : undefined}
                rel={partner.website ? 'noopener noreferrer' : undefined}
                className="group relative h-20 w-40 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-center"
                title={partner.name}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
