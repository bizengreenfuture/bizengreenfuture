'use client';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

interface ProductsGridProps {
  category: 'supertech' | 'fertilizers' | 'feed';
  title?: string;
  showEmpty?: boolean;
}

// Type for product from Convex
interface Product {
  _id: string;
  name: string;
  slug: string;
  category: 'supertech' | 'fertilizers' | 'feed';
  description: string;
  shortDescription?: string;
  price?: string;
  image?: string;
  benefits?: string[];
  specifications?: { label: string; value: string }[];
  status: 'draft' | 'published' | 'archived';
}

export default function ProductsGrid({ category, title, showEmpty = true }: ProductsGridProps) {
  const products = useQuery(api.products.getByCategory, { 
    category, 
    publishedOnly: true 
  }) as Product[] | undefined;

  const categoryLabels: Record<string, string> = {
    supertech: 'SuperTech Products',
    fertilizers: 'Organic Fertilizers',
    feed: 'Animal Feed Products',
  };

  // Loading state
  if (products === undefined) {
    return (
      <div className="space-y-6">
        {title && (
          <h3 className="text-2xl font-bold text-gray-900">{title || categoryLabels[category]}</h3>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border-2 border-gray-100">
              <CardHeader>
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-6 w-3/4 mt-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // No products
  if (products.length === 0) {
    if (!showEmpty) return null;
    
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Yet</h3>
        <p className="text-gray-600">
          Products in this category will appear here once published.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug}`}
            className="group"
          >
            <Card className="h-full border-2 border-gray-100 hover:border-green-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Product Image */}
              {product.image ? (
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-48 w-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                  <Package className="h-16 w-16 text-green-300 group-hover:scale-110 transition-transform" />
                </div>
              )}

              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  {product.price && (
                    <Badge variant="secondary" className="shrink-0 bg-green-100 text-green-700">
                      {product.price}
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.shortDescription || product.description}
                </p>

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="space-y-2">
                    {product.benefits.slice(0, 2).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 line-clamp-1">{benefit}</span>
                      </div>
                    ))}
                    {product.benefits.length > 2 && (
                      <p className="text-xs text-gray-500 pl-6">
                        +{product.benefits.length - 2} more benefits
                      </p>
                    )}
                  </div>
                )}

                {/* View Details Button */}
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600 transition-colors"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
