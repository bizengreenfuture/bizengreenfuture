'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Handshake } from 'lucide-react';

export default function Partners() {
  const partners = useQuery(api.partners.listActive);

  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/30 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Handshake className="h-4 w-4" />
            <span>Trusted Partnerships</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Partners
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We collaborate with leading organizations to bring innovative sustainable solutions to Uganda
          </p>
        </div>

        {!partners ? (
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-40 rounded-lg bg-white/10" />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center gap-6 md:gap-10 flex-wrap">
            {partners.map((partner) => (
              <a
                key={partner._id}
                href={partner.website || '#'}
                target={partner.website ? '_blank' : undefined}
                rel={partner.website ? 'noopener noreferrer' : undefined}
                className="group relative"
                title={partner.name}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Card */}
                <div className="relative h-20 w-40 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 hover:border-green-500/30 p-4 flex items-center justify-center transition-all duration-300 hover:bg-white/15">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-3 brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
