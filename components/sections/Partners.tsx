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
    <section className="py-20 relative overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-emerald-800/60 to-green-900/70"></div>

      {/* Additional subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-green-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 backdrop-blur-md border border-emerald-400/50 text-emerald-100 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
            <Handshake className="h-4 w-4" />
            <span>Trusted Partnerships</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Our Partners
          </h2>
          <p className="text-emerald-50 max-w-2xl mx-auto drop-shadow-lg">
            We collaborate with leading organizations to bring innovative sustainable solutions to Uganda
          </p>
        </div>

        {!partners ? (
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-40 rounded-lg bg-green-800/50" />
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
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                {/* Card */}
                <div className="relative h-20 w-40 bg-gradient-to-br from-green-800 to-emerald-900 backdrop-blur-md rounded-xl border border-green-700 hover:border-emerald-500 p-4 flex items-center justify-center transition-all duration-300 hover:bg-green-700 shadow-lg">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain p-3 opacity-80 group-hover:opacity-100 transition-opacity brightness-0 invert"
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
