'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  CheckCircle2,
  Package,
  ArrowLeft,
  Zap,
  Leaf,
  Fish,
  Share2,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import QuoteForm from '@/components/sections/QuoteForm';
import { toast } from 'sonner';

// Category icons and colors
const categoryConfig: Record<string, { icon: React.ElementType; color: string; label: string; backLink: string }> = {
  supertech: {
    icon: Zap,
    color: 'from-emerald-600 to-emerald-700',
    label: 'SuperTech',
    backLink: '/products/supertech',
  },
  fertilizers: {
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    label: 'Organic Fertilizers',
    backLink: '/products/fertilizers',
  },
  feed: {
    icon: Fish,
    color: 'from-cyan-500 to-blue-600',
    label: 'Animal Feed',
    backLink: '/products/fertilizers',
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = useQuery(api.products.getBySlug, { slug });

  // Loading state
  if (product === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-emerald-950">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-5xl mx-auto">
            <Skeleton className="h-8 w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="h-96 rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product not found or not published
  if (!product || product.status !== 'published') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-emerald-950 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Product Not Found</h1>
          <p className="text-gray-300 mb-6">
            The product you're looking for doesn't exist or is no longer available.
          </p>
          <Link href="/products/supertech">
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const config = categoryConfig[product.category] || categoryConfig.supertech;
  const CategoryIcon = config.icon;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription || product.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-emerald-950">
      {/* Breadcrumb */}
      <div className="bg-gray-800/80 backdrop-blur-sm border-b border-emerald-600/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-400 hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link href={config.backLink} className="text-gray-400 hover:text-emerald-400 transition-colors">
              {config.label}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link
              href={config.backLink}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-emerald-400 mb-8 group transition-colors"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to {config.label}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                {product.image ? (
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 shadow-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : product.category === 'supertech' ? (
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800/80 backdrop-blur-sm border-2 border-emerald-600/30 shadow-lg group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Image
                      src="/supertechexample.png"
                      alt={product.name}
                      fill
                      className="object-contain p-4 relative z-10"
                      priority
                    />
                  </div>
                ) : (
                  <div className={`aspect-square rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
                    <CategoryIcon className="h-32 w-32 text-white/50" />
                  </div>
                )}

                {/* Share Button */}
                <Button
                  variant="outline"
                  className="w-full border-emerald-600/30 text-gray-300 hover:border-emerald-600 hover:text-emerald-400 bg-gray-800/50"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Product
                </Button>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Category Badge */}
                <Badge className={`bg-gradient-to-r from-emerald-600 to-emerald-700 text-white`}>
                  <CategoryIcon className="h-3 w-3 mr-1" />
                  {config.label}
                </Badge>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {product.name}
                </h1>

                {/* Price */}
                {product.price && (
                  <div className="text-2xl font-semibold text-emerald-400">
                    {product.price}
                  </div>
                )}

                {/* Short Description */}
                {product.shortDescription && (
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}

                {/* Full Description */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <Card className="border-2 border-emerald-600/30 bg-emerald-600/10 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Key Benefits
                      </h3>
                      <div className="space-y-3">
                        {product.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <Card className="border-2 border-emerald-600/30 bg-gray-800/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Specifications
                      </h3>
                      <div className="space-y-3">
                        {product.specifications.map((spec, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center py-2 border-b border-emerald-600/20 last:border-0"
                          >
                            <span className="text-gray-300">{spec.label}</span>
                            <span className="font-medium text-white">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-6 text-lg shadow-lg shadow-emerald-600/25"
                  onClick={() => {
                    const form = document.getElementById('quote-form');
                    form?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates Section - Only for SuperTech products */}
        {product.category === 'supertech' && (
          <div className="max-w-6xl mx-auto mt-16 px-4">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-emerald-400" />
                <h2 className="text-3xl font-bold text-white">Official Certifications & Approvals</h2>
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
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          if (target.parentElement) {
                            target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }
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
                          if (target.parentElement) {
                            target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }
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
                          if (target.parentElement) {
                            target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }
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
                          if (target.parentElement) {
                            target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }
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
                          if (target.parentElement) {
                            target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400"><FileText class="h-12 w-12" /></div>';
                          }
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
        )}
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-20 bg-gradient-to-b from-gray-950 via-emerald-950 to-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Interested in {product.name}?
                </h2>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Fill out the form and our team will get back to you with pricing,
                  availability, and any additional information you need.
                </p>
                <div className="space-y-3">
                  {[
                    'Personalized pricing based on your needs',
                    'Expert consultation included',
                    'Fast response within 24 hours',
                    'Delivery options available',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <QuoteForm
                defaultInterest={product.category}
                source={`product-${product.slug}`}
                title="Get a Quote"
                description={`Inquiring about: ${product.name}`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
