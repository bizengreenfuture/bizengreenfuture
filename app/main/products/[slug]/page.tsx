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
    color: 'from-blue-500 to-blue-600',
    label: 'SuperTech',
    backLink: '/main/products/supertech',
  },
  fertilizers: {
    icon: Leaf,
    color: 'from-green-500 to-emerald-600',
    label: 'Organic Fertilizers',
    backLink: '/main/products/fertilizers',
  },
  feed: {
    icon: Fish,
    color: 'from-cyan-500 to-blue-600',
    label: 'Animal Feed',
    backLink: '/main/products/fertilizers',
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const product = useQuery(api.products.getBySlug, { slug });

  // Loading state
  if (product === undefined) {
    return (
      <div className="min-h-screen bg-gray-50">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or is no longer available.
          </p>
          <Link href="/main/products/supertech">
            <Button className="bg-green-600 hover:bg-green-700">
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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={config.backLink} className="text-gray-500 hover:text-gray-700">
              {config.label}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <Link
              href={config.backLink}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to {config.label}
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                {product.image ? (
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border-2 border-gray-100 shadow-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
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
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Product
                </Button>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Category Badge */}
                <Badge className={`bg-gradient-to-r ${config.color} text-white`}>
                  <CategoryIcon className="h-3 w-3 mr-1" />
                  {config.label}
                </Badge>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  {product.name}
                </h1>

                {/* Price */}
                {product.price && (
                  <div className="text-2xl font-semibold text-green-600">
                    {product.price}
                  </div>
                )}

                {/* Short Description */}
                {product.shortDescription && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}

                {/* Full Description */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <Card className="border-2 border-green-100 bg-green-50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Key Benefits
                      </h3>
                      <div className="space-y-3">
                        {product.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Specifications */}
                {product.specifications && product.specifications.length > 0 && (
                  <Card className="border-2 border-gray-100">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Specifications
                      </h3>
                      <div className="space-y-3">
                        {product.specifications.map((spec, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                          >
                            <span className="text-gray-600">{spec.label}</span>
                            <span className="font-medium text-gray-900">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* CTA Button */}
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
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
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Interested in {product.name}?
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
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
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{item}</span>
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
